import gameRepository from '../repository'

import { sessionService } from '~/entities/user/services/session'
import { updateGame } from './gameEventsEmitter'
import { fromRawToGame } from "../domain"

export default defineEventHandler(async (event) => {

    sessionService.verifySession(event)

    const userId = event.context.auth.id

    const gameId = getRouterParam(event, 'id')

    // todo validation

    const game = await gameRepository.getGameById(gameId!)
    if (game) {
        if (game.creatorId === userId) {
            return true
        }
        if (game?.players && game.players.length < 2) {
            const gameUpdated = await gameRepository.joinGame(gameId!, userId)
            updateGame(fromRawToGame(gameUpdated!))
            return true
        }
    }
    return false

})