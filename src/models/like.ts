import { Schema, model } from "mongoose";
import { ILike } from "../entities/Abstractions/ILikes";



const LikeSchema = new Schema({
    userId:{
        type: String,
        required: true,
        ref: 'User'
    },
    postId:{
        type: String,
        required: true,
        ref: 'Post'
    }
});

export const LikeModel = model<ILike>('Like', LikeSchema);