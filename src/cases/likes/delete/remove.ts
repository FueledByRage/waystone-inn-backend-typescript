import { DTOLike } from "../../../entities/DTOs/DTOLikes"
import { ILikeRepository } from "../../../repositories/ILikesRepository";
import { decriptToken } from "../../../utils/cryptography";
import { errorFactory } from "../../../utils/errorFactory";
import { IRemoveLike } from "./controller";

export const removeLike = (likeRepository : ILikeRepository,) : IRemoveLike =>{
    return{
        execute(DTOLike : DTOLike ) : Promise<boolean>  {
            return new Promise( async (resolve, reject)=>{
                try {
                    const userId = await decriptToken(DTOLike.userId);
    
                    if(userId) DTOLike.userId = userId 
                    
                    const removed = await likeRepository.delete(DTOLike)

                    resolve(removed);
                    
                } catch (error) {
                    console.error(error);
                    reject(errorFactory('Error removing like'));
                }


            })
        },
    }
}