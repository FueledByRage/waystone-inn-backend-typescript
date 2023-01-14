import { IUser } from "../../../entities/Abstractions/IUser";
import { User } from "../../../entities/user";
import { IUserRepository } from "../../../repositories/IUserRepository";


export const GetUser = (userRepository: IUserRepository) =>{
    return{
        execute: (username: string) : Promise<IUser | void | null> =>{
            return new Promise(async (resolve, reject) =>{
                const user = await userRepository.read(username).catch((error) =>{
                    reject('An error has occurried reading the data');
                });

                resolve(user);
            });

        }
    }
}