import { IPostRepository } from "../../../repositories/IPostsRepository"
import { errorFactory } from "../../../utils/errorFactory";

export interface IDeletePost{
    execute(id: string, userId: string) : Promise<void>
}

export function deletePost(repository : IPostRepository) : IDeletePost {
    return{
        async execute(id: string, userId : string) : Promise<void> {
            return new Promise(async (resolve, reject) =>{
                try {
                    const post = await repository.read(id);
    
                    if(post?.authorId != userId)  throw errorFactory('You have no authorization to delete this post', 406);
    
                    await repository.delete(id, userId);
    
                    resolve();
                    
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
}