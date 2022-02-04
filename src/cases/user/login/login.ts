import { IUserRepository } from "../../../repositories/IUserRepository";

export function login(userRepository: IUserRepository){
    return{
        execute: async (email: string, password: string)=>{
            return new Promise( async (resolve, reject)=>{
                const user = await userRepository.login(email, password).catch((e: Error)=>{
                    reject(e);
                });

                resolve(user);
            });
        }
    }
}