import { IPost } from "../../../entities/IPosts";
import { IPostRepository } from "../../../repositories/IPostsRepository";

interface IReadPostsReturn{
    posts: Array<IPost>,
    lastPage: boolean
}

export interface IReadPosts {
    execute(id: string, page: number, registers: number) : Promise<IReadPostsReturn>
}

export function ReadPosts(repository: IPostRepository) : IReadPosts {

    return{
        execute(id: string, page: number, registers: number) : Promise<IReadPostsReturn>{
            return new Promise(async (resolve, reject)=>{
                const skip = (page - 1) * registers;
                const response = await repository.readPosts(id, skip, registers)
                .catch((error: Error) =>{
                    reject(error);
                });

                //@ts-ignore
                const lastPage = response.count - (skip + registers) <=0;
                //@ts-ignore
                resolve({posts: response.posts, lastPage: lastPage});
            });
        }
    }
}