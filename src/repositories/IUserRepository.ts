import { User } from "../entities/user";
import { IUser } from "../entities/IUser";
import { DTOUser } from "../entities/DTOs/DTOUser";
import { DTOUpdateUser } from "../entities/DTOs/DTOUpdateUser";

export interface IUserRepository{
    create(user: DTOUser) : Promise<User>;
    read(username: string) : Promise<User | void | null>;
    update( data : DTOUpdateUser ) : Promise<boolean>;
    delete(id: string) : Promise<boolean>;
    getByEmail(email: string) : Promise<User | void | null>;
    findById(id : string) : Promise<User>;
}