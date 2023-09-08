import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'


export const verify = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.TOKEN_SECRET, (err: any, user: any) => {
            if (err) { return res.status(401).json('invalid or expired token') }
            req.user = user
            next()
        })
    } else {
        res.status(401).json("No token found, please login")
    }

}




export const createAccessToken = (user: any) => {
    const accessToken = jwt.sign({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.userName,
        status: user.status,
    }, process.env.TOKEN_SECRET, { expiresIn: '10m' })

    return accessToken
}
export const createRefreshToken = (user: any) => {
    const refreshToken = jwt.sign({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.userName,
        status: user.status,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5d' })

    return refreshToken
}


