import { Schema, model } from "mongoose";
import { IComment } from "../entities/Abstractions/IComments";

const commentSchema = new Schema({
    authorId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId:{
        type: Schema.Types.ObjectId,
        reference: "posts",
        required: true
    },
    comment:{
        type: String,
        required: true
    }
});

export const CommentModel = model<IComment>('Comment', commentSchema);