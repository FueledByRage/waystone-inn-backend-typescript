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
            return new Promise( async (resolve, reject) =>{
                const removeLike = await LikeModel.deleteOne({
                    postId : DTOLike.postId,
                    userId : DTOLike.userId
                }).catch( error  =>{
                    console.error(error);
                    reject(errorFactory('Error deleting like'));
                });

                const removed = removeLike ? removeLike.deletedCount > 0 : false;

                resolve(removed);
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