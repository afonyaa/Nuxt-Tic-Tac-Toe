import gameRepository from '../repository'

export default defineEventHandler(async () => {
    //TODO обработка ошибок (один пользователь может создать только одну игру idle)
    return await gameRepository.createGame()
})