import { DTOLike } from "../../entities/DTOs/DTOLikes";
import { Like } from "../../entities/like";
import { LikeModel } from "../../models/like";
import { errorFactory } from "../../utils/errorFactory";
import { ILikeRepository } from "../ILikesRepository";


export function MongooseLike() : ILikeRepository{
    return{
        create(data : DTOLike ) : Promise<boolean> {
            return new Promise( async (resolve, reject)=>{
                const newLike = new Like(data);
                const createdLike = await (await LikeModel.create(newLike)).save().catch(e =>{
                    reject(errorFactory('Error executing query'));
                }) 
                if(createdLike) resolve(true);
                
                resolve(false);
            });
        },
        read(data : DTOLike) : Promise<Like | void | null >{
            return new Promise( async (resolve, reject) =>{
                const like = await LikeModel.findOne({ userId : data.userId, postId : data.postId })
                .catch(error => reject(new Error('Error executing search')));
                
                resolve(like);
            });
        },
        delete(DTOLike : DTOLike) : Promise<boolean>{
            return new Promise((resolve, reject) =>{

            });
        }
    }
}