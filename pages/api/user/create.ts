import { NextApiRequest, NextApiResponse } from 'next'
import { CreateUserDto } from '../../../typings/CreateUserDto'
import { User } from '@prisma/client'
import UserKit from '../../../utils/UserKit'

interface ExtendedNextApiRequest extends NextApiRequest {
    body: CreateUserDto
}

export default async function createUserApi(req: ExtendedNextApiRequest, res: NextApiResponse<User | string | null>) {
    const { name, email, password } = req.body
    const candidate = await UserKit.findUserByEmail(email)

    if (candidate !== null) { res.send('Failed create new user, email already using') } else {
        const createdUser = await UserKit.createUser({ name, email, password })
        res.status(200)
        res.json(createdUser)
    }

    res.status(500)
    res.send('Failed create new user, email already using')
}