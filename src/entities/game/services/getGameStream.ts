import { fromRawToGame, type Game } from '../domain'
import gameRepository from '../repository'
import { sessionService } from '~/entities/user/services/session'
import { subscribeToUpdateGame } from './gameEventsEmitter'

export default defineEventHandler(async (event) => {
    const gameId = getRouterParam(event, 'id')
    const game = await gameRepository.getGameById(gameId!)
    if (event.method === 'HEAD') {
        sessionService.verifySession(event)
        if (!game) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Game Not found'
            })
        }
        if (game.players.length === 2 && !game.players.find(player => player.id === event.context.auth.id)) {
            throw createError({
                statusCode: 404,
                statusMessage: 'You do not have access to this game'
            })
        }
        return 200
    }

    const stream = createEventStream(event)

    const unsub = subscribeToUpdateGame(gameId!, (game: Game) => {
        stream.push(JSON.stringify(game))
    })

    stream.onClosed(async () => {
        await stream.close()
        unsub()
    })

    sessionService.verifySession(event)
    stream.push(JSON.stringify(fromRawToGame(game!)))

    return stream.send()

})