import EventEmitter from 'node:events'
import type { Game } from '../domain';

const gamesEvents = new EventEmitter()

// Будет утечка, так как внутри эмиттера будут каждый раз добавлятся новые id игр 
// а может и не будут, если при отсутсвии подписчиков будет удалятся название эвента
const updateGame = (game: Game) => {
    gamesEvents.emit(`update:${game.id}`, game)
}

const subscribeToUpdateGame = (
    gameId: string,
    sub: (game: Game) => void) => {
    gamesEvents.on(`update:${gameId}`, (game: Game) => sub(game))
    return () => gamesEvents.off(`update:${gameId}`, sub)
}


export {
    updateGame,
    subscribeToUpdateGame
}