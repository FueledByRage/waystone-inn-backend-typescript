import { DTOSub } from "../../../entities/DTOs/DTOSub";
import { ISubRepository } from "../../../repositories/ISubRepository";
import { IDeleteSub } from "./controller";

export const deleteSub = ( subRepository : ISubRepository ) : IDeleteSub =>{
    return{
        execute(data : DTOSub) {
            return new Promise( async (resolve, reject) =>{
                try {
                    
                    await subRepository.remove(data);
                    resolve();

                } catch (error) {
                    reject(error);
                }
            });
        },
    }
}