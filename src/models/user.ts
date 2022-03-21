import { Schema, model } from "mongoose";

export interface IUserSchema{
    name: string;
    user: string;
    email: string;
    password: string;
    date: Date;
    subs: Array<string>;
    profileURL: string;
}

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now()
    },
    subs:{
        type: Array,
        default: [],
        select: false
    },
    profileURL:{
        type: String,
    }
});

export const UserModel = model<IUserSchema>('User', userSchema);