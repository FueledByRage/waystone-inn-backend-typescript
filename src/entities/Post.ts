import { DTOPost } from "./DTOs/DTOPost"

export class Post{
    public authorId: string;
    public communityId: string;
    public title: string;
    public body: string;
    public fileName: string = '';
    public url: string = '';

    constructor( data: DTOPost ){
        this.authorId = data.authorId;
        this.communityId =data.communityId;
        this.title = data.title;
        this.body = data.body;
    }
}