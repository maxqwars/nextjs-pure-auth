import { PrismaClient, User } from '@prisma/client'
import { CreateUserDto } from '../typings/CreateUserDto'
import crypto from 'crypto'

class UserKit {

    private _prisma = new PrismaClient()

    async createUser(dto: CreateUserDto): Promise<User | null> {
        const { name, email, password } = dto
        const { hash, salt } = this._setPassword(password)

        const newUser = await this._prisma.user.create({
            data: {
                name,
                email,
                hash,
                salt
            }
        })

        return newUser
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const candidate = await this._prisma.user.findFirst({ where: { email } })
        return candidate
    }

    private _setPassword(pass: string) {
        const salt = crypto.randomBytes(16).toString("hex")
        const hash = crypto.pbkdf2Sync(pass, salt, 1000, 64, `sha512`).toString()
        return { hash, salt }
    }

}

export default new UserKit