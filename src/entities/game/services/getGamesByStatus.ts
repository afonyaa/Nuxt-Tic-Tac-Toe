import type { GameStatus } from '../domain'
import gameRepository from '../repository'

export default defineEventHandler(async (event) => {
    const status = getRouterParam(event, 'status')
    return await gameRepository.gamesList(status as GameStatus)
})