import { ICommentRepository } from "../../../repositories/ICommentRepository";

export interface IDeleteComment{
    execute(id: string, userId: string) : Promise<void>
}

export function deleteComment(repository : ICommentRepository) : IDeleteComment {
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