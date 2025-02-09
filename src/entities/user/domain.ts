import { type User as UserRaw } from "@prisma/client"
import type { SessionData } from "./services/session";

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
