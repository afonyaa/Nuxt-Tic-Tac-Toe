import gameRepository from '../repository'

import { sessionService } from '~/entities/user/services/session'
import { updateGame as updateGameStream } from './gameEventsEmitter'
import { fromRawToGame, GameSign, GameStatus, type GameField } from "../domain"
import { hasWinner, isGameFieldFull } from './gameResult'

export default defineEventHandler(async (event) => {

    sessionService.verifySession(event)

    const userId = event.context.auth.id

    const gameId = getRouterParam(event, 'id')

    const game = await gameRepository.getGameById(gameId!)
    if (game) {
        const body = await readBody(event)
        const field = body.field as GameField
        if (game?.players && game.players.length === 2 && game.players.find(user => user.id === userId)) {
            let gameUpdatedRaw = await gameRepository.updateGameField(gameId!, field)
            const gameFieldToCheck = fromRawToGame(gameUpdatedRaw!).field
            const winnerSign = hasWinner(gameFieldToCheck)
            if (winnerSign) {
                let winnerId = winnerSign === GameSign.Cross ? game.creatorId : game.players.find(player => player.id !== game.creatorId)?.id
                gameUpdatedRaw = await gameRepository.finishGame(gameId!, GameStatus.Finished, winnerId!)
            }

            if (isGameFieldFull(gameFieldToCheck)) {
                gameUpdatedRaw = await gameRepository.finishGame(gameId!, GameStatus.FinishedDraw)
            }
            updateGameStream(fromRawToGame(gameUpdatedRaw!))
            return true
        }
    }
    throw createError({ statusCode: 500 })

})