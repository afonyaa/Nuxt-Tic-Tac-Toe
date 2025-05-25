import gameRepository from '../repository'
import { sessionService } from '~/entities/user/services/session'

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
            console.log('do not have an access')
            throw createError({
                statusCode: 404,
                statusMessage: 'You do not have access to this game'
            })
        }
        return 200
    }

    const stream = createEventStream(event)

    stream.onClosed(async () => {
        await stream.close()
    })

    sessionService.verifySession(event)
    stream.push(JSON.stringify(game))

    return stream.send()

})