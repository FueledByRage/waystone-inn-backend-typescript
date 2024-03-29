import { Schema, model } from "mongoose";
import { IPost } from "../entities/Abstractions/IPosts";
import * as dotenv from 'dotenv';

dotenv.config();


const PostSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    communityId: {
        type: Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    date:{
        type: Date,
    },
    url: {
        type: String,
    },
    likes:{
        type: Number,
        default: 0
    },
    dislikes:{
        type: Number,
        default: 0
    },
    fileName:{
        type: String
    },
});



export const PostModel = model<IPost>('Post', PostSchema);