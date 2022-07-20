import { NextApiRequest, NextApiResponse } from 'next'
import { CreateUserDto } from '../../../typings/CreateUserDto'
import { UserDto } from '../../../typings/UserDto'
import UserKit from '../../../utils/UserKit'

interface ExtendedNextApiRequest extends NextApiRequest {
    body: CreateUserDto
}

export default async function createUserApi(req: ExtendedNextApiRequest, res: NextApiResponse<UserDto | string>) {
    const { name, email, password } = req.body
    const candidate = await UserKit.findUserByEmail(email)

    console.log('Trying create new user with data...', req.body)
    console.log('candidate', candidate)

    if (candidate !== null) { res.send('Failed create new user, email already using') } else {
        const createdUser = await UserKit.createUser({ name, email, password })

        console.log("success create new user")

        res.status(200)
        res.json({
            email: createdUser?.email || "unknown",
            name: createdUser?.name || "unknown"
        })
    }

    res.status(500)
    res.send('Failed create new user, email already using')
}