import { IPostRepository } from "../../../repositories/IPostsRepository"
import { errorFactory } from "../../../utils/errorFactory";

export interface IDeletePost{
    execute(id: string, userId: string) : Promise<void>
}

export function deletePost(repository : IPostRepository) : IDeletePost {
    return{
        async execute(id: string, userId : string) : Promise<void> {
            return new Promise(async (resolve, reject) =>{

                const post = await repository.read(id).catch(error => reject(Error('Error reaching post data.')))

                if(post?.authorId != userId) reject(errorFactory('You have no authorization to delete this post', 406));

                await repository.delete(id, userId).catch((error: Error) =>{
                    reject(Error('An error has occurried deleting the data.'));
                });

                resolve();
            });
        }
    }
}