import { type User as UserRaw } from "@prisma/client"

export type User = {
    id: string;
    login: string;
    passwordHash: string;
    passwordSalt: string;
    rating: number;
}

export type SessionEntity = {
    id: string;
    login: string;
}


//TODO добить
export const userToSession = () => {

}
