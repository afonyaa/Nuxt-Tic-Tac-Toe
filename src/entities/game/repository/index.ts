import prisma from "~/shared/lib/db"
import { fromRawToGame, GameStatus, gameStatusToRaw, type Game } from "../domain"

const gamesList = async ({ status }: { status: GameStatus }): Promise<Game[]> => {
    const gamesRaw = await prisma.game.findMany({
        where: {
            status: {
                equals: gameStatusToRaw[status]
            }
        },
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