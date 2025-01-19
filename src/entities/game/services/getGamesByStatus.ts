import type { Game, GameStatus } from "../domain";
import gameRepository from '../repository'

export const getGamesByStatus = async (gameStatus: GameStatus): Promise<Game[]> => {
    return await gameRepository.gamesList({ status: gameStatus })
}