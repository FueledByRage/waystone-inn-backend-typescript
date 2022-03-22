import { IPost } from "../../../entities/IPosts";
import { IPostRepository } from "../../../repositories/IPostsRepository";

export interface IReadPost {
    execute(id: string) : Promise<IPost>
}

export function ReadPost(repository: IPostRepository) : IReadPost {

    return{
        execute(id: string) : Promise<IPost>{
            return new Promise(async (resolve, reject)=>{
                const post = await repository.read(id)
                .catch((error: Error) =>{
                    reject(error);
                });

                //@ts-ignore
                resolve(post);
            });
        }
    }
}