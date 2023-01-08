import { DTOPost } from "../../../entities/DTOs/DTOPost";
import { Post } from "../../../entities/Post";
import { IPostRepository } from "../../../repositories/IPostsRepository";


export interface ICreatePost {
    execute(data : DTOPost) : Promise<Post>;
}


export function CreatePost(repository: IPostRepository) : ICreatePost{
    return{
        execute(data : DTOPost) :Promise<Post>{
            return new Promise( async (resolve, reject) =>{
                try {
                    const newPost = await repository.create(data);
                    
                    if(newPost) return resolve(newPost);
                    throw new Error( 'Error saving post');
                } catch (error) {
                    reject(Error('Error saving post'));
                }
            });
        }
    }
}