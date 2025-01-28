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

const createGame = async (): Promise<Game> => {
    const player = await prisma.user.findFirst()
    const game = await prisma.game.create({
        data: {
            field: [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ],
            creator: {
                connect: {
                    id: player?.id
                }
            },
            players: {
                connect: {
                    id: player?.id
                }
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
    return fromRawToGame(game)
}

export default {
    gamesList,
    createGame
}