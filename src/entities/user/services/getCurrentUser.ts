import { sessionService } from './session'

export default defineEventHandler(async (event) => {
    sessionService.verifySession(event)
    return { login: event.context.auth.login }
})