import { Comment } from "../../../entities/Comments";
import { DTOComment } from "../../../entities/DTOs/DTOComments";
import { IComment } from "../../../entities/IComments";
import { ICommentRepository } from "../../../repositories/ICommentRepository";
import { errorFactory } from "../../../utils/errorFactory";



export interface ICreateComment {
    execute(data : DTOComment) : Promise<Comment>;
}


export function CreateComment(repository: ICommentRepository) : ICreateComment{
    return{
        execute(data : DTOComment) : Promise<IComment>{
            return new Promise( async (resolve, reject) =>{

                const newComment = await repository.create(data).catch((error: Error)=>{
                    reject(error);
                });
                
                newComment && resolve(newComment);

                reject( errorFactory('Error saving comment.'));
            });
        }
    }
}