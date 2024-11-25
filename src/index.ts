import express from "express";
import jwt from "jsonwebtoken";
import { contentModel, linkModel, userModel } from './db'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { JWT_SECRET } from "./config";
import { auth } from "./middleware/auth";
import { hashGen } from "./utils";

const app = express();
const salt: number = 5;
app.use(express.json());


const zsignupSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(8).max(20) //add should have atleast one uppercase, one lowercase, one special character, one number
});

type signupSchema = z.infer<typeof zsignupSchema>

app.post("/api/v1/signup", async (req, res) => {
    const { username, password }: signupSchema = req.body
    const validationResult = zsignupSchema.safeParse({ username, password })

    if (!validationResult.success) {
        return res.status(411).json({ error: validationResult.error.errors })
    }

    try {
        const hash = await bcrypt.hash(password, salt)
        await userModel.create({ username, password: hash })
        return res.status(200).json({ message: "Signed up " })
    } catch (error: any) {
        console.error("Error during signup:", error);

        if (error.code === 11000) {
            return res.status(403).json({ message: "user already exits, do signin" })
        }
    }
})


app.post("/api/v1/signin", async (req, res) => {
    const { username, password } = req.body

    const user = await userModel.findOne({ username: username })

    if (!user) {
        return res.json({ message: "user doesnt exist" })
    }

    const passwordValid: boolean = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
        return res.json({ message: "Invalid Creditials" })
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET)

    return res.json({ token: token })


})

app.post("/api/v1/content", auth, async (req, res) => {
    const link = req.body.link
    const type = req.body.type

    try {
        await contentModel.create({
            link, type,
            title: req.body.title,
            //@ts-ignore
            userId: req.userId
        })

        res.json({ message: "content added" })
    } catch (error) {
        console.error(error)
        res.json({ error })
    }
})

app.get("/api/v1/content", auth, async (req, res) => {
    const content = await contentModel.find({
        //@ts-ignore
        userId: req.userId
    }, 'link type title tag userId').populate({ path: 'userId', select: 'username -_id' })

    if (!content) {
        return res.json({ message: "nothing exits" })
    }
    res.json({ content })
})

app.delete("/api/v1/content", auth, async (req, res) => {
    const contentId = req.body.contentId
    try {
        await contentModel.deleteOne({
            //@ts-ignore
            userId: req.userId,
            _id: contentId
        })

        res.status(200).json({
            message: "Deleted"
        })
    } catch (error) {
        console.error(error)
        res.json({ error: error, msg: "did you provide content id" })
    }
})

app.post("/api/v1/brain/share", auth, async (req, res) => {
    const share = req.body.share
    console.log(typeof share);
    if (share === "false") {
        await linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })
        res.json({ message: "share link deleted" })
        return
    }
    if (!share) {
        res.json({ message: "is not avialble" })
        return
    }

    //checking if the link already exits 
    const existingLink = await linkModel.findOne({
        //@ts-ignore
        userId: req.userId
    })
    if (existingLink) {
        res.json({
            "link": "http://localhost:3000/api/v1/brain/" + existingLink.hash
        })
        return
    }
    // if the link doesnt exits
    const hash = hashGen(7)
    const linkCreated = await linkModel.create({
        hash,
        //@ts-ignore
        userId: req.userId
    })

    if (!linkCreated) {
        res.json({ message: "error duing db file creation" })
        return
    }

    res.json({
        "link": "http://localhost:3000/api/v1/brain/" + hash
    })

})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const shareLink = req.params.shareLink
    if (!shareLink) {
        res.json({ message: "invaliad || sharing is not allowed" })
        return
    }
    const link = await linkModel.findOne({ hash: shareLink }).populate({ path: 'userId', select: 'username -_id' });
    if (!link) {
        res.json({ message: "user brain not public" })

    }
    res.json({ message: link })

})

app.listen(3000, () => {
    console.log("server is running");

})