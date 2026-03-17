import { Request, Response } from "express"
import { Environment } from "../config/Environment";
import { StatusCodes } from "http-status-codes";
import { userModel } from "../models/User";
import { BadRequestError } from "../errors/bad-request"
import jwt from "jsonwebtoken"
import { UnauthenticatedError } from "../errors";
import bcrypt from "bcryptjs"

export class AuthController {

    static register = async (req: Request, res: Response) => {
        const { name, password, email } = req.body;

        if (!name || !password || !email) {
            throw new BadRequestError("Fields name, password or email missing")
        }

        const user = await userModel.create({ name, email, password })
        const token = jwt.sign({ userId: user._id, name: user.name }, Environment.JWT_SECRET, {
            expiresIn: Environment.JWT_LIFETIME as any
        })

        res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
    }

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body

        if (!email || !password) {
            throw new BadRequestError("Fields email or password missing")
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            throw new UnauthenticatedError("Invalid Credentials")
        }

        const token = jwt.sign({ userId: user._id, name: user.name }, Environment.JWT_SECRET, {
            expiresIn: Environment.JWT_LIFETIME as any
        })

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            throw new UnauthenticatedError("Invalid Credentials")

        }

        res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
    }

}