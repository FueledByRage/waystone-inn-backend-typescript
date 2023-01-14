import { DTOUpdateUser } from "../../../entities/DTOs/DTOUpdateUser";
import { IUser } from "../../../entities/Abstractions/IUser";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IUpdateUser } from "./controller";
import * as dotenv from 'dotenv';

dotenv.config();

export const updateUser = ( userRepository : IUserRepository ) : IUpdateUser => {
    return{
        execute: (data : DTOUpdateUser ) : Promise<boolean> => {
            return new Promise( async ( resolve, reject ) =>{
                try {

                    data.profileURL = data.profileURL ?? `${process.env.UPLOAD_URL}/img/user/${data.profileURL}`
                    const updated = await userRepository.update(data);
    
                    resolve(updated);
                } catch (error) {
                    reject(error);
                }
            });
        },
    }
}