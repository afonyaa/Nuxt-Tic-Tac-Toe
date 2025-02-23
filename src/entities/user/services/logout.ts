import { sessionService } from "./session"

export default defineEventHandler(async (event) => {
    sessionService.deleteSession(event)

    return true
})