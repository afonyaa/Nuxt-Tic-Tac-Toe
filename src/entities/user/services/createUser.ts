import userRepository from '../repository/'
import { passwordService } from './password'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const existingUser = await userRepository.getUser({ login: body.login })
    if (existingUser) {
        // console.log('already exists', existingUser)
        // TODO error handler
        return false
    }


    const { passwordHash, passwordSalt } = await passwordService.hashPassword(body.password)

    await userRepository.createUser({
        login: body.login,
        passwordHash: passwordHash,
        passwordSalt: passwordSalt
    })

    return true
})