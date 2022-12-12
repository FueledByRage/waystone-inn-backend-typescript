import { User } from "../../../entities/user";
import { IUserRepository } from "../../../repositories/IUserRepository";

export function CreateUser(userRepository: IUserRepository)  {

    const checkCredentials = async (data : User) : Promise<string | null>=>{
        return new Promise( async (resolve, reject) =>{
            const user = await userRepository.getByEmail(data.email);
            if(user)  resolve('Email already registered');
            const username = await userRepository.read(data.user);
            if(username) resolve('This username has been taken');
            return resolve(null);
        });
    }

    return{
        execute: (user: User) : Promise<User | void | null> => {
            return new Promise(async (resolve, reject)=>{

                const credentialsError = await checkCredentials(user);

                if(credentialsError) reject('Email already registered');

                const newUser = await userRepository.create(user).catch( e => { reject(e)});
                resolve(newUser);
            }) 
        }
    }
}