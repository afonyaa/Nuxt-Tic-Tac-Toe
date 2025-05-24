import { sessionService } from "~/entities/user/services/session"
import gameRepository from '../repository'

export default defineEventHandler(async (event) => {
    const stream = createEventStream(event)

    stream.onClosed(async () => {
        await stream.close()
    })

    sessionService.verifySession(event)

    const gameId = getRouterParam(event, 'id')
    const game = await gameRepository.getGameById(gameId!)

    stream.push(JSON.stringify(game))

    return stream.send()

})