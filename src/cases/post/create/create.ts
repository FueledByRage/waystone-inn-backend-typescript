import { Post } from "../../../entities/Post";
import { IPostRepository } from "../../../repositories/IPostsRepository";


export interface ICreatePost {
    execute(title: string, body: string, id: string, authorId: string) : Promise<Post>;
}


export function CreatePost(repository: IPostRepository) : ICreatePost{
    return{
        execute(title: string, body: string, id: string, authorId: string) :Promise<Post>{
            return new Promise( async (resolve, reject) =>{
                const post = new Post(authorId, id, title, body);
                const newPost = await repository.create(post);
                
                //@ts-ignore
                resolve(newPost);
            });
        }
    }
}