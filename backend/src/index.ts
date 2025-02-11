import express from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { contentModel, linkModel, userModel } from "./db"; // Adjust as per your db import
import { JWT_SECRET } from "./config"; // If needed
import { auth } from "./middleware/auth"; // If needed
import { extractTwitterLinkId, extractYoutubeLinkId, hashGen } from "./utils"; // If needed
import jwt from "jsonwebtoken";
const cors = require("cors");

const app = express();
const salt: number = 5;

app.use(express.json());
app.use(cors());

const zsignupSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username Must be 3 or more characters" })
    .max(10, { message: "Username Must be 10 or less characters" }),
  password: z
    .string()
    .min(8, { message: "Password Must be 8 or more characters" })
    .max(20, { message: "Password Must be 20 or less characters" }), // Should have at least one uppercase, one lowercase, one special character, one number
});
const zContentSchema = z.object({
  link: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")), // Allow empty string
  type: z.string().min(1, { message: "Type is required" }), // Ensure type is required
  title: z.string().min(1, { message: "Title is required" }), // Ensure title is required
  tags: z.array(z.string()).optional(), // Tags should be an array of strings
  description: z.string().optional(), // Description is optional
});

type signupSchema = z.infer<typeof zsignupSchema>;

app.post("/api/v1/signup", async (req, res) => {
  const { username, password }: signupSchema = req.body;
  const validationResult = zsignupSchema.safeParse({ username, password });

  if (!validationResult.success) {
    res.status(411).json({ error: validationResult.error.errors });
    return;
  }

  try {
    const hash = await bcrypt.hash(password, salt);
    await userModel.create({ username, password: hash });
    res.status(200).json({ message: "Signed up" });
    return;
  } catch (error: any) {
    console.error("Error during signup:", error);

    if (error.code === 11000) {
      res.status(403).json({ message: "User already exists, please sign in" });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username: username });

  if (!user) {
    res.status(401).json({ message: "User doesn't exist, SignUp First" });
    return;
  }

  const passwordValid: boolean = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    res.status(401).json({ message: "Invalid Creditials" });
    return;
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET);

  res.json({ token: token });
});

app.post("/api/v1/content", auth, async (req, res) => {
  try {
    let parsedData = zContentSchema.parse({
      link: req.body.link || "", // Default to empty string if not provided
      type: req.body.type,
      title: req.body.title,
      tags: req.body.tags || [],
      description: req.body.description || "",
    });

    //extract the  id from the link
    if (parsedData.type === "video" && parsedData.link) {
      parsedData.link = extractYoutubeLinkId(parsedData.link);
    }
    
    if (parsedData.type === "tweet" && parsedData.link) {
      parsedData.link = extractTwitterLinkId(parsedData.link);
    }

    await contentModel.create({
      ...parsedData,
      //@ts-ignore
      userId: req.userId,
    });

    res.status(201).json({ message: "Content added successfully" });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/v1/content", auth, async (req, res) => {
  const content = await contentModel.find(
    {
      //@ts-ignore
      userId: req.userId,
    },
    "link type title tag createdAt"
  );

  if (!content) {
    res.status(204).json({ message: "nothing exits" });
    return;
  }
  res.json({ content });
});

app.delete("/api/v1/content", auth, async (req, res) => {
  const contentId = req.body.contentId;
  try {
    await contentModel.deleteOne({
      //@ts-ignore
      userId: req.userId,
      _id: contentId,
    });

    res.status(200).json({
      message: "Deleted",
    });
  } catch (error) {
    console.error(error);
    res.json({ error: error, msg: "did you provide content id" });
  }
});

app.post("/api/v1/brain/share", auth, async (req, res) => {
  const share = req.body.share;
  if (share === "false") {
    await linkModel.deleteOne({
      //@ts-ignore
      userId: req.userId,
    });
    res.json({ message: "share link deleted" });
    return;
  }
  if (!share) {
    res.json({ message: "is not avialble" });
    return;
  }

  //checking if the link already exits
  const existingLink = await linkModel.findOne({
    //@ts-ignore
    userId: req.userId,
  });
  if (existingLink) {
    res.json({
      link: "http://localhost:3000/api/v1/brain/" + existingLink.hash,
    });
    return;
  }
  // if the link doesnt exits
  const hash = hashGen(7);
  const linkCreated = await linkModel.create({
    hash,
    //@ts-ignore
    userId: req.userId,
  });

  if (!linkCreated) {
    res.json({ message: "error duing db file creation" });
    return;
  }

  res.json({
    link: "http://localhost:3000/api/v1/brain/" + hash,
  });
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const shareLink = req.params.shareLink;
  if (!shareLink) {
    res.json({ message: "invaliad || sharing is not allowed" });
    return;
  }
  const link = await linkModel
    .findOne({ hash: shareLink })
    .populate({ path: "userId", select: "username -_id" });
  if (!link) {
    res.json({ message: "user brain not public" });
  }
  res.json({ message: link });
});

app.listen(3000, () => {
  console.log("server is running");
});
