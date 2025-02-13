import { sessionService } from '~/entities/user/services/session'
import gameRepository from '../repository'
import prisma from "~/shared/lib/db"

export default defineEventHandler(async (event) => {
    sessionService.verifySession(event)
    // TODO брать пользователя текущего брать из сессии
    const player = await prisma.user.findFirst()
    return await gameRepository.createGame(player?.id!)
})