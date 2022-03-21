import { Schema, model } from "mongoose";

export interface ICommunitySchema{
    name: string;
    description: string;
    authorId: string;
    members: Array<string>;
    date: Date;
}

const communitySchema = new Schema({
    authorId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    members:{
        type: Array,
        required: true,
        select: false
    },
    date:{
        type: Date,
        default: Date.now(),
    }
});

export const CommunityModel = model<ICommunitySchema>('Community', communitySchema);