import { IPost } from "../../../entities/IPosts";
import { IPostRepository } from "../../../repositories/IPostsRepository";

interface IGetPostsFeedReturn{
    posts: Array<IPost>,
    lastPage: boolean
}

export interface IGetPostsFeed {
    execute(id: string, page: number, registers: number) : Promise<IGetPostsFeedReturn>
}

export function getPostsFeed(repository: IPostRepository) : IGetPostsFeed {

    return{
        execute(id: string, page: number, registers: number) : Promise<IGetPostsFeedReturn>{
            return new Promise(async (resolve, reject)=>{
                const skip = (page - 1) * registers;
                const response = await repository.getPostsFeed(id, skip, registers)
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