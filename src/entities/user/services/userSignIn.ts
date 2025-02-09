import jwt from 'jsonwebtoken'
import userRepository from '../repository/'
import { passwordService } from './password'
import { sessionService } from './session'


//todo nuxt auth middleware for session
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    //todo zod
    const user = await userRepository.getUser({ login: body.login })
    if (!user) {
        return { error: 'no such user' }
    }

    const passwordsMatch = await passwordService
        .comparePasswords(body.password, user.passwordHash, user.passwordSalt)

    if (!passwordsMatch) {
        return { error: 'passwords do not match' }
    }

    const token = sessionService.encryptSession({ login: body.login, id: user.id })

    await new Promise((res) => { setTimeout(res, 5000) })

    const verifyToken = sessionService.decryptSession(token)

    return { token, verifyToken }
})