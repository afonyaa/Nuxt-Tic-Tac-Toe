import { $Enums, type Game as GameRaw, type User as UserRaw, GameStatus as GameStatusRaw } from "@prisma/client"
import { z } from 'zod'

export type Game = GameFinished | GameFinishedDraw | GamePending | GameInProgress

type BaseGameFields = {
    id: string
    createdAt: Date
    creator: Player
    field: GameField
}

export type GameFinished = BaseGameFields & {
    status: GameStatus.Finished
    players: Player[]
    winner: Player
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

export type Player = Omit<UserRaw, 'passwordHash' | 'passwordSalt'>

export enum GameStatus {
    Finished = 'Finished',
    FinishedDraw = 'FinishedDraw',
    Pending = 'Pending',
    InProgress = 'InProgress'
}

export type GameField = (GameSign | null)[][]

export enum GameSign {
    Cross = 'Cross',
    Circle = 'Circle'
}

// Probably not needed
export const gameStatusToRaw: Record<GameStatus, GameStatusRaw> = {
    [GameStatus.Finished]: 'Finished',
    [GameStatus.FinishedDraw]: 'FinishedDraw',
    [GameStatus.InProgress]: 'InProgress',
    [GameStatus.Pending]: 'Pending',
}

export const fromRawToGame = (
    rawGame: GameRaw &
    {
        players: Omit<UserRaw, 'passwordHash' | 'passwordSalt'>[],
        winner: Omit<UserRaw, 'passwordHash' | 'passwordSalt'> | null
        creator: Omit<UserRaw, 'passwordHash' | 'passwordSalt'>
    }): Game => {
    const status = rawGame.status

    switch (status) {
        case $Enums.GameStatus.Pending:
            return {
                id: rawGame.id,
                status: GameStatus.Pending,
                createdAt: rawGame.createdAt,
                creator: rawGame.creator,
                players: rawGame.players,
                field: zGameSchema.parse(rawGame.field)
            } satisfies GamePending
        case $Enums.GameStatus.InProgress:
            return {
                id: rawGame.id,
                status: GameStatus.InProgress,
                createdAt: rawGame.createdAt,
                creator: rawGame.creator,
                players: rawGame.players,
                field: zGameSchema.parse(rawGame.field)
            } satisfies GameInProgress
        case $Enums.GameStatus.Finished:
            return {
                id: rawGame.id,
                status: GameStatus.Finished,
                createdAt: rawGame.createdAt,
                creator: rawGame.creator,
                players: rawGame.players,
                winner: zPlayerSchema.parse(rawGame.winner),
                field: zGameSchema.parse(rawGame.field)
            } satisfies GameFinished
        case $Enums.GameStatus.FinishedDraw:
            return {
                id: rawGame.id,
                status: GameStatus.FinishedDraw,
                createdAt: rawGame.createdAt,
                creator: rawGame.creator,
                players: rawGame.players,
                field: zGameSchema.parse(rawGame.field)
            } satisfies GameFinishedDraw
    }
}

let zFieldCell = z.enum([GameSign.Cross, GameSign.Circle]).nullable()
const zGameSchema = z.array(z.array(zFieldCell).length(3)).length(3)
const zPlayerSchema = z.object({ id: z.string(), login: z.string(), rating: z.number() })