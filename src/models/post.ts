import { Schema, model } from "mongoose";
import { IPost } from "../entities/IPosts";


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
        default: Date.now()
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
    listOfUsersWhoLikedIt:{
        type: Array,
        select: false,
        default: [],
    },
    listOfUsersWhoDislikedIt:{
        type: Array,
        select: false,
        default: []
    }
});

PostSchema.pre('save', function(){
    if(!this.url && this.fileName) this.url = ``
});

export const PostModel = model<IPost>('Post', PostSchema);