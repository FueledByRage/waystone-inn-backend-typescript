import { DTOUser } from "./DTOs/DTOUser";

export class User{
    public readonly _id : string;       
    public user: string;
    public name: string;
    public password: string;
    public email: string;

    constructor(data : DTOUser, id : string){
        this.user = data.user;
        this.name = data.name;
        this.password = data.password;
        this.email = data.email;
        this._id = id;
    }
}