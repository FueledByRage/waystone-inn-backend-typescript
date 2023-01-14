import { iCommunity } from "./Abstractions/ICommunity";
import { DTOCommunity } from "./DTOs/DTOCommunity";

export class Community{
    public readonly _id!: string;
    public authorId!: string;
    public name!: string;
    public description!: string;
    public sub?: boolean = false;
    public date! : Date;
    constructor( data : iCommunity){
        Object.assign(this, data);
    }
}