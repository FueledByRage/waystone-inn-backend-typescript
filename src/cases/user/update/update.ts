import { DTOUpdateUser } from "../../../entities/DTOs/DTOUpdateUser";
import { IUser } from "../../../entities/IUser";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IUpdateUser } from "./controller";

export const updateUser = ( userRepository : IUserRepository ) : IUpdateUser => {
    return{
        execute: (data : DTOUpdateUser ) : Promise<boolean> => {
            return new Promise( async ( resolve, reject ) =>{
                try {
                    const updated = await userRepository.update(data);
    
                    resolve(updated);
                } catch (error) {
                    reject(error);
                }
            });
        },
    }
}