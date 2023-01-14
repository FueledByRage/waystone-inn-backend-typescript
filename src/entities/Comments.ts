import { IComment } from "./Abstractions/IComments";
import { DTOComment } from "./DTOs/DTOComments";

export class Comment {
    public readonly _id!: string;
    public postId!: string;
    public authorId!: string;
    public comment!: string;
    constructor( data : IComment){
        Object.assign(this, data);
    }
}