import { sessionService } from "~/entities/user/services/session"
import gameRepository from '../repository'

export default defineEventHandler(async (event) => {
    const gameId = getRouterParam(event, 'id')
    const game = await gameRepository.getGameById(gameId!)
    if (!game && event.method === 'HEAD') {
        throw createError({
            statusCode: 404,
            statusMessage: 'Game Not found'
        })
    }
    if (event.method === 'HEAD') {
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