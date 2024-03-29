import { ILike } from "../../entities/Abstractions/ILikes";
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
        read(data : DTOLike) : Promise<ILike | void | null >{
            return new Promise( async (resolve, reject) =>{
                try {
                    const like = await LikeModel.findOne({ userId : data.userId, postId : data.postId });
                    
                    resolve(like);

                } catch (error) {
                    reject(error);
                }
            });
        },
        delete(DTOLike : DTOLike) : Promise<boolean>{
            return new Promise( async (resolve, reject) =>{
                try {
                    const removeLike = await LikeModel.deleteOne({
                        postId : DTOLike.postId,
                        userId : DTOLike.userId
                    });
                    
                    const removed = removeLike.deletedCount > 0;
                    
                    resolve(removed);
                    
                } catch (error) {
                    console.error(error);
                    reject(error);
                }
        })
        },
        getCount(postId : string) : Promise<number> {
            return new Promise( async (resolve, reject)=>{
                const count = await LikeModel.findOne({
                    postId
                }).count()

                resolve(count);
            })
        },
    }
}