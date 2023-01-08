import { DTOUser } from "../../../entities/DTOs/DTOUser";
import { User } from "../../../entities/user";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { errorFactory } from "../../../utils/errorFactory";
import { ICreateUser } from "./controller";

export function CreateUser(userRepository: IUserRepository) : ICreateUser  {

    const checkCredentials = async (data : DTOUser) : Promise<string | null>=>{
        return new Promise( async (resolve, reject) =>{
            const user = userRepository.getByEmail(data.email);
            const username = userRepository.read(data.user);
            const results = await Promise.all(
                [
                    user,
                    username
                ]
            );
            if(results[0]) return resolve('Email already registered');
            if(results[1]) return resolve('This username has been taken');
            return resolve(null);
        });
    }

    return{
        execute: (user: DTOUser) : Promise<User> => {
            return new Promise(async (resolve, reject)=>{
                try {
                    const credentialsError = await checkCredentials(user);
                    
                    if(credentialsError) reject( errorFactory(credentialsError, 406));
                    
                    const newUser = await userRepository.create(user);
                    resolve(newUser);
                    
                } catch (error) {
                    reject(errorFactory('Error saving user'))
                }
                    
            }) 
        }
    }
}