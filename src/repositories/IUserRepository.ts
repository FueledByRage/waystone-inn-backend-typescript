import { User } from "../entities/user";
import { DTOUser } from "../entities/DTOs/DTOUser";
import { DTOUpdateUser } from "../entities/DTOs/DTOUpdateUser";
import { IUser } from "../entities/Abstractions/IUser";

export interface IUserRepository{
    create(user: DTOUser) : Promise<IUser>;
    read(username: string) : Promise<IUser | void | null>;
    update( data : DTOUpdateUser ) : Promise<boolean>;
    delete(id: string) : Promise<boolean>;
    getByEmail(email: string) : Promise<IUser | void | null>;
    findById(id : string) : Promise<IUser>;
}