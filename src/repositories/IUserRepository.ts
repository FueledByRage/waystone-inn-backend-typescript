import { User } from "../entities/user";
import { IUser } from "../entities/IUser";

export interface IUserRepository{

    create(user: User) : Promise<IUser>
    read(id: string) : Promise<IUser>
    update(id: string, data: Object) : Promise<boolean>
    delete(id: string) : Promise<boolean>
}