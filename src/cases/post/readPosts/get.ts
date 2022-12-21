import { DTOLike } from "../../../entities/DTOs/DTOLikes";
import { DTOPostByCommunity } from "../../../entities/DTOs/DTOPostByCommunity";
import { IPost } from "../../../entities/IPosts";
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
                const skip = (data.page - 1) * data.register;
                const response = await repository.readPosts( data.communtityId, skip, data.register)
                .catch((error: Error) =>{
                    reject(error);
                });
                
                const lastPage = response ? response.count - (skip + data.register) <=0 : false;
                if(!data.token && response) return resolve({posts: response.posts, lastPage: lastPage});

                const userId = await decriptToken(data.token)
                .catch( error => reject(errorFactory('Authentication error', 406)));

                const posts = response && await Promise.all(response.posts.map( async post =>{
                    const dataLike = new DTOLike(userId || '', post._id);
                    const isLiked = await likeRepository.read(dataLike).catch((error) =>{});

                    post.liked = isLiked != null;
                    return post;
                }));

                resolve({posts : posts ? posts : [], lastPage});
            });
        }
    }
}