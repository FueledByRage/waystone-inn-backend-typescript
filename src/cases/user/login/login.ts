import { IUserRepository } from "../../../repositories/IUserRepository";
import { errorFactory } from "../../../utils/errorFactory";

export function login(userRepository: IUserRepository){
    return{
        execute: async (email: string, password: string)=>{
            return new Promise( async (resolve, reject)=>{

                const user = await userRepository.getByEmail(email).catch((e: Error)=>{
                    reject(e);
                });

                if(!user) reject(errorFactory('User not found', 404));

                //@ts-ignore
                if(user.password == password) resolve(user);
                
                reject(errorFactory('Invalid email or password.', 406));
            });
        }
    }
}