import { User } from "../entities/user";
import { IUser } from "../entities/IUser";

export interface IUserRepository{
    create(user: User) : Promise<IUser | void | null >;
    read(username: string) : Promise<IUser | void | null>;
    update(id: string, data: Object) : Promise<boolean>;
    delete(id: string) : Promise<boolean>;
    getByEmail(email: string) : Promise<IUser | void | null>;
}