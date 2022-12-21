import { DTOCommunity } from "./DTOs/DTOCommunity";

export class Community{
    public authorId : string;
    public name: string;
    public description: string;
    public members: Array<string>;
    constructor( data : DTOCommunity){
        this.authorId = data.authorId;
        this.name = data.name;
        this.description = data.description;   
        this.members = [data.authorId]; 
    }
}