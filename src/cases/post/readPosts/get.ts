import { DTOLike } from "../../../entities/DTOs/DTOLikes";
import { DTOPostByCommunity } from "../../../entities/DTOs/DTOPostByCommunity";
import { IPost } from "../../../entities/Abstractions/IPosts";
import { Post } from "../../../entities/Post";
import { ILikeRepository } from "../../../repositories/ILikesRepository";
import { IPostRepository } from "../../../repositories/IPostsRepository";
import { decriptToken } from "../../../utils/cryptography";
import { errorFactory } from "../../../utils/errorFactory";

interface IReadPostsReturn{
    posts: Array<IPost>,
    lastPage: boolean
}

export interface IReadPosts {
    execute(data : DTOPostByCommunity) : Promise<IReadPostsReturn>
}

export function ReadPosts(repository: IPostRepository, likeRepository : ILikeRepository) : IReadPosts {

    return{
        execute(data : DTOPostByCommunity) : Promise<IReadPostsReturn>{
            return new Promise(async (resolve, reject)=>{
                try {
                    const skip = (data.page - 1) * data.register;
                    const response = await repository.readPosts( data.communtityId, skip, data.register);
                    
                    const lastPage =  response.count - (skip + data.register) <=0;
                    if(!data.userId) return resolve({posts: response.posts, lastPage});
    
    
                    const posts = await Promise.all(response.posts.map( async post =>{
                        const dataLike = new DTOLike(data.userId, post._id);
                        const isLiked = await likeRepository.read(dataLike);
    
                        const count = await likeRepository.getCount(dataLike.postId);
                        post.likes = count;
    
                        post.liked = isLiked != null;
                        return post;
                    }));
    
                    resolve({ posts, lastPage });
                    
                } catch (error) {
                    reject( error );
                }
            });
        }
    }
}