import { DTOGetPosts } from "../../../entities/DTOs/DTOGetPosts";
import { DTOLike } from "../../../entities/DTOs/DTOLikes";
import { IPost } from "../../../entities/IPosts";
import { ILikeRepository } from "../../../repositories/ILikesRepository";
import { IPostRepository } from "../../../repositories/IPostsRepository";
import { ISubRepository } from "../../../repositories/ISubRepository";
import { decriptToken } from "../../../utils/cryptography";

interface IGetPostsFeedReturn{
    posts: Array<IPost>,
    lastPage: boolean
}

export interface IGetPostsFeed {
    execute(data : DTOGetPosts) : Promise<IGetPostsFeedReturn>
}

export function getPostsFeed(repository: IPostRepository, likeRepository : ILikeRepository, subRepository : ISubRepository) : IGetPostsFeed {

    return{
        execute(data : DTOGetPosts) : Promise<IGetPostsFeedReturn>{
            return new Promise(async (resolve, reject)=>{
                try {
                    const skip = (data.page - 1) * data.register;
                    const id = await decriptToken(data.id);
    
                    //@ts-ignore
                    const subs = await subRepository.getUserSubs(id);

                    const subsId = subs.map( element => element.communityId );
    
                    const response = await repository.getPostsFeed(skip, data.register, subsId);
    
                    const posts = response && await Promise.all(response.posts.map(async post =>{
                        const dtoLike = new DTOLike(id || '', post._id)
                        const like = await likeRepository.read(dtoLike);
                        if(like) post.liked = true;
                        const count = await likeRepository.getCount(dtoLike.postId);
                        post.likesCount = count;
                        return post;
                    }));
    
                    const lastPage = response ? response.count - (skip + data.register) <=0 : true;
                    if(posts) resolve({posts, lastPage: lastPage});
                    reject(new Error('Error getting data'));
                    
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
}