import { IUser } from "./Abstractions/IUser";
import { DTOUser } from "./DTOs/DTOUser";

export class User{
    public readonly _id! : string;       
    public user! : string;
    public name!: string;
    public password?: string;
    public email!: string;

    constructor(data : IUser){
        Object.assign(this, data)
    }
}