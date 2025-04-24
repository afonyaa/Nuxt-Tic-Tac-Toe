import { sessionService } from '~/entities/user/services/session'
import gameRepository from '../repository'
import prisma from "~/shared/lib/db"

export default defineEventHandler(async (event) => {
    sessionService.verifySession(event)

    sessionService.verifySession(event)

    const userId = event.context.auth.id

    return await gameRepository.createGame(userId!)
})