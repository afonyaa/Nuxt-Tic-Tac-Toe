import gameRepository from '../repository'

import { sessionService } from '~/entities/user/services/session'

export default defineEventHandler(async (event) => {

    sessionService.verifySession(event)

    const gameId = getRouterParam(event, 'id')

    const game = await gameRepository.getGameById(gameId!)

    return game
})