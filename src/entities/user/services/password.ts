import bcrypt from 'bcrypt'

const generateSalt = async (rounds: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(rounds, (err, salt) => {
            if (err) {
                return reject(err)
            }
            resolve(salt)
        })
    })
}

const generateHash = async (passwordRaw: string, salt: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(passwordRaw, salt, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        })
    })
}

const doPasswordMatchWithHashed = async (password: string, passwordHash: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        })
    })
}

const hashPassword = async (passwordRaw: string) => {
    const passwordSalt = await generateSalt(10)
    const passwordHash = await generateHash(passwordRaw, passwordSalt)

    return { passwordHash, passwordSalt }
}
const comparePasswords = async (password: string, passwordHash: string, salt: string) => {
    return await doPasswordMatchWithHashed(password, passwordHash)
}

export const passwordService = {
    hashPassword,
    comparePasswords
}