import prisma from "~/shared/lib/db"
import type { User } from "../domain"
import type { Prisma } from "@prisma/client"

const createUser = async (userData: Prisma.UserCreateInput): Promise<User> => {
    const userCreated = await prisma.user.create({
        data: {
            login: userData.login,
            passwordHash: userData.passwordHash,
            passwordSalt: userData.passwordSalt
        }
    })

    return userCreated
}

const getUser = async (userData: Prisma.UserWhereInput) => {
    return prisma.user.findFirst({ where: userData })
}

export default {
    createUser,
    getUser
}