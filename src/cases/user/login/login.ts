import { IUser } from "../../../entities/Abstractions/IUser";
import { User } from "../../../entities/user";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { errorFactory } from "../../../utils/errorFactory";

export function login(userRepository: IUserRepository){
    return{
        execute: (email: string, password: string) : Promise<IUser> =>{
            return new Promise( async (resolve, reject)=>{

                const user = await userRepository.getByEmail(email).catch((e: Error)=>{
                    reject(e);
                });


                if(user && user.password == password) resolve(user);
                
                reject(errorFactory('Invalid email or password.', 406));
            });
        }
    }
}