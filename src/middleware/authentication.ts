import { Request, Response, NextFunction } from "express"

import jwt from "jsonwebtoken"
import { BadRequestError, UnauthenticatedError } from "../errors";
import { Environment } from "../config/Environment";
import { userModel } from "../models/User";

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader?.startsWith("Bearer")) {
        throw new BadRequestError("No token provided");
    }

    const token = authHeader.split(" ").at(-1)
    if (!token) {
        throw new BadRequestError("No token provided")
    }


    try {

        const payload = jwt.verify(token, Environment.JWT_SECRET) as ITokenPayload;

        // const user = userModel.findById(payload.userId).select("-password") as any;
        // req.user = user

        req.user = {
            userId: payload?.userId,
            name: payload?.name,
        }

        next()
    } catch (error) {
        throw new UnauthenticatedError("Not authorized")
    }
}