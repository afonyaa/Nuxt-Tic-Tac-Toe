import { $Enums, type Game as GameRaw, type User as UserRaw } from "@prisma/client"

export type Game = GameFinished | GameFinishedDraw | GamePending | GameInProgress

type BaseGameFields = {
    id: string
    createdAt: Date
    creatorId: string
}

export type GameFinished = BaseGameFields & {
    status: GameStatus.Finished
    players: Player[]
    winnerId: string
}

export type GameFinishedDraw = BaseGameFields & {
    status: GameStatus.FinishedDraw
    players: Player[]
}

export type GameInProgress = BaseGameFields & {
    status: GameStatus.InProgress
    players: Player[]
}

export type GamePending = BaseGameFields & {
    status: GameStatus.Pending
    players: Player[]
}

export type Player = {
    id: string
    login: string
}

export enum GameStatus {
    Finished = 'Finished',
    FinishedDraw = 'FinishedDraw',
    Pending = 'Pending',
    InProgress = 'InProgress'
}

export const fromRawToGame = (rawGame: GameRaw & { players: UserRaw[] }): Game => {
    const status = rawGame.status

    switch (status) {
        case $Enums.GameStatus.Pending:
            return {
                id: rawGame.id,
                status: GameStatus.Pending,
                createdAt: rawGame.createdAt,
                creatorId: String(rawGame.creatorId),
                players: rawGame.players
            } satisfies GamePending
        case $Enums.GameStatus.InProgress:
            return {
                id: rawGame.id,
                status: GameStatus.InProgress,
                createdAt: rawGame.createdAt,
                creatorId: String(rawGame.creatorId),
                players: rawGame.players
            } satisfies GameInProgress
        case $Enums.GameStatus.Finished:
            return {
                id: rawGame.id,
                status: GameStatus.Finished,
                createdAt: rawGame.createdAt,
                creatorId: String(rawGame.creatorId),
                players: rawGame.players,
                winnerId: rawGame.winnerId!
            } satisfies GameFinished
        case $Enums.GameStatus.FinishedDraw:
            return {
                id: rawGame.id,
                status: GameStatus.FinishedDraw,
                createdAt: rawGame.createdAt,
                creatorId: String(rawGame.creatorId),
                players: rawGame.players
            } satisfies GameFinishedDraw
    }
}