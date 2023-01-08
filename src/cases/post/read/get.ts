import { DTOLike } from "../../../entities/DTOs/DTOLikes";
import { IPost } from "../../../entities/IPosts";
import { ILikeRepository } from "../../../repositories/ILikesRepository";
import { IPostRepository } from "../../../repositories/IPostsRepository";
import { decriptToken } from "../../../utils/cryptography";
import { errorFactory } from "../../../utils/errorFactory";

export interface IReadPost {
    execute(id: string, userId?: string ) : Promise<IPost>
}

export function ReadPost(repository: IPostRepository, likeRepository : ILikeRepository) : IReadPost {

    return{
        execute(id: string, userId? : string ) : Promise<IPost>{
            return new Promise(async (resolve, reject)=>{
                try {
                    let post = await repository.read(id);
    
                    if(!userId) return resolve(post);               
    
                    const dataLike = new DTOLike(userId, id);
                    const like = await likeRepository.read(dataLike);
    
                    const count = await likeRepository.getCount(dataLike.postId);
                    post.likesCount = count;
    
                    if(like) post.liked = true;
                    else if(!like) post.liked = false;
    
                    resolve(post);
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
}