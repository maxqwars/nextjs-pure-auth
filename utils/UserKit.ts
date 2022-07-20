import { PrismaClient, User } from '@prisma/client'
import { CreateUserDto } from '../typings/CreateUserDto'
import crypto from 'crypto'

class UserKit {

    private _prisma = new PrismaClient()

    async createUser(dto: CreateUserDto): Promise<User | null> {
        const { name, email, password } = dto
        const { hash, salt } = this._setPassword(password)

        const newUser = await this._prisma.user.create({
            data: { name, email, hash, salt }
        })

        return newUser
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const candidate = await this._prisma.user.findUnique({ where: { email } })
        return candidate
    }

    private _setPassword(pass: string) {
        const salt = crypto.randomBytes(16).toString("hex")
        const hash = crypto.pbkdf2Sync(pass, salt, 1000, 64, `sha512`).toString("hex")
        return { hash, salt }
    }

    matchPasswords(receivedPassword: string, databaseHash: string, salt: string): boolean {
        const receivedPasswordHash = this._hashStringWithSalt(receivedPassword, salt)
        return receivedPasswordHash === databaseHash
    }

    private _hashStringWithSalt(str: string, salt: string): string {
        return crypto.pbkdf2Sync(str, salt, 1000, 64, "sha512").toString("hex")
    }

}

export default new UserKit