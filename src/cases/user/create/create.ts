import { User } from "../../../entities/user";
import { IUserRepository } from "../../../repositories/IUserRepository";

export function CreateUser(userRepository: IUserRepository) {
    return{
        execute: (user: User)=>{
            return new Promise(async (resolve, reject)=>{
                const newUser = await userRepository.create(user).catch( e =>{ reject(e)});
                resolve(newUser);
            }) 
        }
    }
}