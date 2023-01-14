import { IPost } from "./Abstractions/IPosts";
import { DTOPost } from "./DTOs/DTOPost"

export class Post{
    public readonly _id! : string;
    public authorId! : string;
    public communityId! : string;
    public title! : string;
    public body! : string;
    public date! : Date;
    public likes! : number;
    public dislikes! : number;
    public fileName: string = '';
    public url: string = '';

    constructor( data: IPost ){
        Object.assign(this, data);
    }
}