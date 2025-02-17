import jwt from 'jsonwebtoken'
import { H3Event } from "h3";
import { ACCESSS_TOKEN_NAME, type SessionEntity } from "../domain";
// Сессия - закодированная информация о пользователе
// находящаяся в куках, на основании которой 
// мы можем безопасно идентифицировать и авторизовать пользователя
// и аутентифицировать


// Заменить модулем Nuxt authentication 
// после просмотра https://www.youtube.com/watch?v=vQldMjSJ6-w&pp=ygUUand0IGphdmFzY3JpcHQgbmluamE%3D
// и рефакторинга + осознания как это работает

const EXPIRES_AT = '8h'

const secretKey = process.env.JWT_SECRET ?? ''
export type SessionData = {
    login: string,
    id: string,
}

const encryptSession = (sessionData: SessionData) => {
    const token = jwt.sign(sessionData, secretKey, { expiresIn: EXPIRES_AT })
    return token
}

const decryptSession = (token: string) => {
    try {
        return jwt.verify(token, secretKey)
    } catch (e) {
        return { error: e }
    }
}

const addSession = (sessionData: SessionData, event: H3Event) => {
    const token = encryptSession(sessionData)
    // TODO вынести в домен 8 часов
    setCookie(event, ACCESSS_TOKEN_NAME, token, { maxAge: 60 * 60 * 24 * 8, httpOnly: true })
}

const deleteSession = () => {
    // todo
}

const verifySession = (event: H3Event) => {
    const accessToken = getCookie(event, ACCESSS_TOKEN_NAME)
    if (accessToken) {
        const sessionInfo = decryptSession(accessToken) as SessionEntity
        // @ts-ignore
        if (!sessionInfo.error) {
            if (sessionInfo?.login) {
                event.context.auth = {
                    login: sessionInfo?.login,
                    id: sessionInfo?.id
                }
                return;
            }
        }
    }
    throw createError({
        statusCode: 403,
        statusMessage: 'Unauthorized'
    })
}

export const sessionService = {
    addSession,
    deleteSession,
    verifySession
}
