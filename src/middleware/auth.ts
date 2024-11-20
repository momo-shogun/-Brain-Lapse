import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config";
import jwt from 'jsonwebtoken'

export  function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']
    if(!token){
        return res.json({message:"you are not logged in"})
    }
    const decodeData =  jwt.verify(token as string, JWT_SECRET)
    
    if (decodeData) {
        //@ts-ignore
        req.userId = decodeData.id
        next()
    }
    else {
        return res.status(403).json({ message: "You are not logged in" })
    }
}