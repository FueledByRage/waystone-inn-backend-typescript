import { Comment } from "../../../entities/Comments";
import { IComment } from "../../../entities/IComments";
import { ICommentRepository } from "../../../repositories/ICommentRepository";



export interface ICreateComment {
    execute(id: string, userId: string, commentBody: string) : Promise<Comment>;
}


export function CreateComment(repository: ICommentRepository) : ICreateComment{
    return{
        execute(id: string, userId: string, commentBody: string ) : Promise<IComment>{
            return new Promise( async (resolve, reject) =>{
                const comment = new Comment(id, userId, commentBody);

                const newComment = await repository.create(comment).catch((error: Error)=>{
                    reject(error);
                });
                
                //@ts-ignore
                resolve(newComment);
            });
        }
    }
}