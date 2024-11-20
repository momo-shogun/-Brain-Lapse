import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userModel } from './db'
import {  z } from 'zod'
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import  dotenv from  'dotenv/config'

console.log(process.env)
const app = express();
const salt = 5;
app.use(express.json());


const zsignupSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(8).max(20) //add should have atleast one uppercase, one lowercase, one special character, one number
});
const zsigninSchema = z.object


app.post("/api/v1/signup", async (req: Request, res: Response): Promise<void> => {
    const username: string = req.body.username
    const password: string = req.body.password
    const validationResult = zsignupSchema.safeParse({ username, password })

    if (!validationResult.success) {
        res.status(411).json({ error: validationResult.error.errors })
        return
    }

    try {
        const hash = await bcrypt.hash(password, salt)
        await userModel.create({ username, password: hash })
        res.status(200).json({ message: "Signed up " })
    } catch (error: any) {
        console.error("Error during signup:", error);
        if (error.code === 403) {
            res.status(403).json({ error: "Username exists" })
            return
        }
    }
})


app.post("/api/v1/signin", async (req, res) => {
    const { username, password } = req.body

    const user = await userModel.findOne({username:username})

    if (!user) {
        return res.json({ message: "user doesnt exist" })
    }

    const passwordValid: boolean = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
        return res.json({ message: "Invalid Creditials" })
    }
    const token = jwt.sign(user.id, process.env.)

    return res.json({ token: token })


})

app.post("/api/v1/content", (req, res) => {

})

app.get("/api/v1/content", (req, res) => {

})

app.delete("/api/v1/content", (req, res) => {

})

app.post("/api/v1/brain/share", (req, res) => {

})

app.get("/api/v1/brain/:shareLink", (req, res) => {

})

app.listen(3000, () => {
    console.log("server is running");

})