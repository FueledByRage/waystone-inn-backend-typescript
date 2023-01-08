import { User } from "../entities/user";
import { IUser } from "../entities/IUser";
import { DTOUser } from "../entities/DTOs/DTOUser";

export interface IUserRepository{
    create(user: DTOUser) : Promise<User>;
    read(username: string) : Promise<User | void | null>;
    update(id: string, data: Object) : Promise<boolean>;
    delete(id: string) : Promise<boolean>;
    getByEmail(email: string) : Promise<User | void | null>;
    findById(id : string) : Promise<User>;
}