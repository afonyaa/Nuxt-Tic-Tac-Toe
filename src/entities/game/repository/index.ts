import prisma from "~/shared/lib/db"
import { fromRawToGame, type Game } from "../domain"

const gamesList = async (): Promise<Game[]> => {
    const gamesRaw = await prisma.game.findMany({
        include: {
            players: true,
            winner: {
                select: {
                    login: true,
                    id: true
                }
            },
            creator: {
                select: {
                    login: true,
                    id: true
                }
            }
        }
    })
    return gamesRaw.map(fromRawToGame)
}

export default {
    gamesList
}