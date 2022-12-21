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

                const newPost = await repository.create(data).catch(error => reject('Error salving post'));
                
                if(newPost) resolve(newPost);
                reject(Error('Error saving post'));
            });
        }
    }
}