import { DTOLike } from "../../../entities/DTOs/DTOLikes";
import { IPost } from "../../../entities/IPosts";
import { ILikeRepository } from "../../../repositories/ILikesRepository";
import { IPostRepository } from "../../../repositories/IPostsRepository";
import { decriptToken } from "../../../utils/cryptography";
import { errorFactory } from "../../../utils/errorFactory";

export interface IReadPost {
    execute(id: string, token?: string | string[]) : Promise<IPost>
}

export function ReadPost(repository: IPostRepository, likeRepository : ILikeRepository) : IReadPost {

    return{
        execute(id: string, token? : string | string[]) : Promise<IPost>{
            return new Promise(async (resolve, reject)=>{

                let post = await repository
                .read(id)
                .catch((error: Error) =>{
                    reject(error);
                });


                //@ts-ignore
                if(!token) return resolve(post);
                
                //@ts-ignore
                const userId = await decriptToken(token).catch((error: Error) =>{
                    reject(errorFactory('Authentication error', 406));
                });                

                const dataLike = new DTOLike(userId || '' , id);
                const like = await likeRepository.read(dataLike);

                const count = await likeRepository.getCount(dataLike.postId);
                if(post) post.likesCount = count;

                if(like && post) post.liked = true;
                else if(!like && post) post.liked = false;

                if(post) return resolve(post);
                reject( errorFactory('Post not found', 404));
            });
        }
    }
}