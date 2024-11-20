import mongoose from "mongoose";
import { Schema, Types } from "mongoose";

mongoose.connect('mongodb://localhost:27017/brain')

const contentTypes = ["video", "audio", "article", "image"]

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const contentSchema = new Schema({
    link: {
        type: String, required: true

    },
    type: {
        type: String, enum: contentTypes, required: true

    },
    title: {
        type: String, required: true

    },
    tag: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }


})

const tagSchema = new Schema({
    title: { type: String, required: true, unique: true }
})

const linkSchema = new Schema({
    hash: String,
    userId: { type: Types.ObjectId, ref: 'User', required: true }
})

export const tagModel = mongoose.model('Tag', linkSchema)
export const userModel = mongoose.model('User', userSchema)
export const contentModel = mongoose.model('Content', contentSchema)
export const linkModel = mongoose.model('Link', linkSchema)
