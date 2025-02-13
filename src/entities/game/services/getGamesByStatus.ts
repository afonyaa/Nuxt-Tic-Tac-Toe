import type { GameStatus } from '../domain'
import gameRepository from '../repository'

import { sessionService } from '~/entities/user/services/session'

export default defineEventHandler(async (event) => {

    sessionService.verifySession(event)

    const status = getRouterParam(event, 'status')
    return await gameRepository.gamesList(status as GameStatus)
})