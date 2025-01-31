import gameRepository from '../repository'
import prisma from "~/shared/lib/db"

export default defineEventHandler(async () => {
    // TODO брать пользователя текущего
    const player = await prisma.user.findFirst()
    return await gameRepository.createGame(player?.id!)
})