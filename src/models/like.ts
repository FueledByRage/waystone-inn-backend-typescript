import { Schema, model } from "mongoose";

export interface ILike{
    userId : string,
    postId: string
}

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