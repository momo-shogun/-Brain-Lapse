import mongoose from "mongoose";
import { Schema } from 'mongoose';

mongoose.connect('mongodb://localhost:27017/brain')

const contentTypes = ["video", "tweet", "document", "image"]

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})
export const userModel = mongoose.model('User', userSchema)

const tagSchema = new Schema({
    title: { type: String, required: true, unique: true }
})
export const tagModel = mongoose.model('Tag', tagSchema)

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
    tag: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now() }

})


const linkSchema = new Schema({
    hash: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true }
})

export const contentModel = mongoose.model('Content', contentSchema)
export const linkModel = mongoose.model('Link', linkSchema)
