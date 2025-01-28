import gameRepository from '../repository'

export default defineEventHandler(async () => {
    return await gameRepository.createGame()
})