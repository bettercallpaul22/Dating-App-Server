import { NextFunction, Request, Response } from "express"
import { UserModel } from "../schema/userModel"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createAccessToken, createRefreshToken } from "../milddleWare/tokenValidation"
import TokenModel from "../schema/tokenSchema"
import { loginSchema, signUpSchema } from "../milddleWare/joiSchema"







// Register
export const register = async (req: Request, res: Response) => {
    try {
        const { error } = signUpSchema.validate(req.body);
        const {
            firstName,
            lastName,
            email,
            gender,
            city,
            state,
            country,
            avatar,
            followers,
            age,
            password,
            height,
            orientation_,
            bodyType,
            ethnicity,
            hasChildren,
            genderInterest,
            religion,
            about,
        } = req.body
        const salt = bcrypt.genSaltSync(10)
        const hPassword = bcrypt.hashSync(password, salt)
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json("Email already exists")
        } else {
            const user = new UserModel({
                firstName,
                lastName,
                userName: email.split("@")[0],
                email,
                gender,
                city,
                state,
                country,
                avatar,
                followers,
                age,
                height,
                orientation_,
                bodyType,
                ethnicity,
                hasChildren,
                genderInterest,
                religion,
                about,
                password: hPassword
            })
            await user.save()
            const accessToken = createAccessToken(user)
            const refreshToken = createRefreshToken(user)
            res.cookie('jwt_token', refreshToken, {
                httpOnly: true, // accesible only by web browser
                secure: true, //https
                sameSite: 'none', // cross-site cookie
                maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time set to match token
            })

            return res.status(201).json({
                _id: user._id,
                success: true,
                accessToken,
            })

        }

    } catch (error) {
        res.status(500).json(error.message)

    }
}


// Login
export const login = async (req: Request, res: Response) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).json(error.details[0].message);
        const { email, password } = req.body

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "Email doesn't exist" })
        } else {
            const ePassword = bcrypt.compareSync(password, user.password)
            if (ePassword) {
                const accessToken = createAccessToken(user)
                const refreshToken: any = createRefreshToken(user)
                await TokenModel.findOneAndDelete({ userId: user.id })
                new TokenModel({ userId: user.id, refreshToken }).save()


                res.cookie('jwt_token', refreshToken, {
                    httpOnly: true, // accesible only by web browser
                    secure: true, //https
                    sameSite: 'none', // cross-site cookie
                    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time set to match token
                })

                return res.status(200).json({
                    // user: user,
                    success: true,
                    accessToken,
                })
            } else {
                return res.status(401).json({ message: "Password is incorrect" })
            }

        }

    } catch (error) {
        res.status(500).json(error.message)

    }
}


// Refresh token
export const refresh = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies["jwt_token"]
        if (!refreshToken) return res.status(401).json("You are not authenticated")
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err: any, user: any) => {
            if (err) { return res.status(401).json('invalid or expired token') }
            const accessToken = createAccessToken(user)
            const refreshToken = createRefreshToken(user)
            res.status(200).json({ success: true, accessToken, refreshToken })
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}



export const logOut = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies["jwt_token"]
        if (!refreshToken) return res.status(401).json("You are not authenticated")
        res.clearCookie('jwt_token', { httpOnly: true, sameSite: 'none', secure: true })
        res.json("Cookies cleared")

    } catch (error) {
        res.status(500).json(error.message)
    }

}






