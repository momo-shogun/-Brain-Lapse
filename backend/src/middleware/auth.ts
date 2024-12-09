import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config";
import jwt, { JwtPayload } from 'jsonwebtoken'

export function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']
    const decodeData = jwt.verify(token as string, JWT_SECRET)

    if (decodeData) {
        if (typeof decodeData === "string") {
            res.json({
                message: "You are not logged in"
            })
            return
        }
        //@ts-ignore
        req.userId = (decodeData as JwtPayload).id
        next()
    }
    else {
        res.status(403).json({ message: "You are not logged in" })
        return
    }
}