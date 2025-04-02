import gameRepository from '../repository'

import { sessionService } from '~/entities/user/services/session'

export default defineEventHandler(async (event) => {

    sessionService.verifySession(event)

    const userId = event.context.auth.id

    const gameId = getRouterParam(event, 'id')

    // todo validation

    const game = await gameRepository.getGameById(gameId!)
    if (game?.players && game.players.length < 2) {
        await gameRepository.joinGame(gameId!, userId)
        return true
    }
    return false

})