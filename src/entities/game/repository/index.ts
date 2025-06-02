import prisma from "~/shared/lib/db"
import { fromRawToGame, GameStatus, gameStatusToRaw, type Game, type GameField } from "../domain"

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

const getGameById = (gameId: string) => {
    return prisma.game.findFirst({
        where: {
            id: {
                equals: gameId,
            }
        },
        include: {
            players: {
                select: {
                    login: true,
                    id: true,
                    rating: true
                }
            },
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
}

const joinGame = async (gameId: string, playerId: string) => {
    await prisma.game.update({
        where: {
            id: gameId
        },
        data: {
            players: {
                connect: {
                    id: playerId
                }
            },
            status: GameStatus.InProgress
        }
    })
    return await getGameById(gameId)
}

const updateGameField = async (gameId: string, field: GameField) => {
    await prisma.game.update({
        where: {
            id: gameId
        },
        data: {
            field
        }
    })
    return getGameById(gameId)
}

const finishGame = async (
    gameId: string,
    status: GameStatus.Finished | GameStatus.FinishedDraw,
    winnerId?: string
) => {

    if (winnerId) {
        await prisma.game.update({
            where: {
                id: gameId
            },
            data: {
                status,
                winner: {
                    connect: {
                        id: winnerId
                    }
                }
            }
        })
    }
    else {
        await prisma.game.update({
            where: {
                id: gameId
            },
            data: {
                status,
            }
        })
    }
    return getGameById(gameId)
}

export default {
    gamesList,
    createGame,
    getGameById,
    joinGame,
    updateGameField,
    finishGame
}