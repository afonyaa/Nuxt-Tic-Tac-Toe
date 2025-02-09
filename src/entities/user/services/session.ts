import jwt from 'jsonwebtoken'
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
    // TODO рассмотреть, что будет, если мы создаем session, затем перезапускаем приложение
    // как отработает jwt verify
    // к вопросу о том где хранить
    const token = jwt.sign(sessionData, secretKey, { expiresIn: EXPIRES_AT })
    return token
}

const decryptSession = (token: string) => {
    try {
        return jwt.verify(token, secretKey)
    } catch (e) {
        return e
    }
}

const addSession = (sessionData: SessionData) => {
    // todo
}

const deleteSession = () => {
    // todo
}

const verifySession = () => {
    // middleWare
}

export const sessionService = {
    encryptSession,
    decryptSession
}
