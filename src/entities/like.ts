import { DTOLike } from "./DTOs/DTOLikes";

export class Like{

    public userId: string;
    public postId: string;

    constructor( data : DTOLike ){
        this.userId = data.userId
        this.postId = data.postId
    }

}