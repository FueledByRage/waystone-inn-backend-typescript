import { DTOLike } from "../../../entities/DTOs/DTOLikes"
import { ILikeRepository } from "../../../repositories/ILikesRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { errorFactory } from "../../../utils/errorFactory";
import { ICreateLike } from "./controller";

export const createLike = ( likeRepository : ILikeRepository, userRepository : IUserRepository ) : ICreateLike => {
    return{
        execute(DTOLike : DTOLike) : Promise<boolean>{
            return new Promise( async (resolve, reject) =>{
                const user = await userRepository.findById(DTOLike.userId).catch( error =>{
                    reject(new Error('Error finding user'));
                });
                
                if(!user) reject( errorFactory('User not found', 404));
                const created = await likeRepository.create(DTOLike).catch(e => reject(e));

                if(created) resolve(true);

                resolve(false);
            });
        }
    }
}