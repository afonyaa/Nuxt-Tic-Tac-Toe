import prisma from "~/shared/lib/db"
import { fromRawToGame, GameStatus, gameStatusToRaw, type Game } from "../domain"

const gamesList = async (status: GameStatus): Promise<Game[]> => {
    const gamesRaw = await prisma.game.findMany({
        where: {
            status: {
                equals: gameStatusToRaw[status],
            }
        },
        include: {
            players: true,
            winner: {
                select: {
                    login: true,
                    rating: true,
                    id: true
                }
            },
            creator: {
                select: {
                    login: true,
                    rating: true,
                    id: true
                }
            }
        }
    })
    return gamesRaw.map(fromRawToGame)
}

const createGame = async (playerId: string): Promise<Game | { error: string }> => {
    const player = await prisma.user.findFirst({
        where: {
            id: playerId
        }
    })

    const games = await gamesList(GameStatus.Pending)
    if (games.find(game => game.creator.id === player?.id)) {
        // TODO throw или просто объект
        return {
            error: 'Cannot create new game, you already have'
        }
    }

    const game = await prisma.game.create({
        data: {
            field: [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ],
            creator: {
                connect: {
                    id: playerId
                }
            },
            players: {
                connect: {
                    id: playerId
                }
            }
        },
        include: {
            players: true,
            winner: {
                select: {
                    login: true,
                    rating: true,
                    id: true
                }
            },
            creator: {
                select: {
                    login: true,
                    id: true,
                    rating: true,
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