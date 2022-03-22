import { IPostRepository } from "../../../repositories/IPostsRepository"

export interface IDeletePost{
    execute(id: string, userId: string) : Promise<void>
}

export function deletePost(repository : IPostRepository) : IDeletePost {
    return{
        async execute(id: string, userId : string) : Promise<void> {
            return new Promise(async (resolve, reject) =>{

                await repository.delete(id, userId).catch((error: Error) =>{
                    reject(error);
                });

                resolve();
            });
        }
    }
}