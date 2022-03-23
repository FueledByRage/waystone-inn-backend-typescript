import { IComment } from "../../../entities/IComments";
import { ICommentRepository } from "../../../repositories/ICommentRepository";

export interface IReadComment {
    execute(id: string) : Promise<IComment>
}

export function ReadComments(repository: ICommentRepository) : IReadComment {

    return{
        execute(id: string) : Promise<IComment>{
            return new Promise(async (resolve, reject)=>{
                const comments = await repository.read(id)
                .catch((error: Error) =>{
                    reject(error);
                });

                //@ts-ignore
                resolve(comments);
            });
        }
    }
}