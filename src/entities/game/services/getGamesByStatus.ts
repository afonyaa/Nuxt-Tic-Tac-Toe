import gameRepository from '../repository'

export default defineEventHandler(async (event) => {
    return await gameRepository.gamesList()
})