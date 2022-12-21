import { Comment } from "../../entities/Comments";
import { DTOComment } from "../../entities/DTOs/DTOComments";
import { IComment } from "../../entities/IComments";
import { CommentModel } from "../../models/comment";
import { errorFactory } from "../../utils/errorFactory";
import { ICommentRepository } from "../ICommentRepository";


export function MongooseComment() : ICommentRepository{
    return{
        create(data : DTOComment) : Promise<IComment> {
            return new Promise(async (resolve, reject) =>{
                const comment = new Comment(data.postId , data.userId, data.comment);

                const newComment = await CommentModel.create(comment).catch((error : Error)=>{
                    const createdError = errorFactory('Error executing database request.', 500);
                    reject(createdError);
                });
                
                
                newComment && resolve(newComment);
                reject(new Error('Error saving comment'));
            });
        },
        read(id: string) : Promise<Array<IComment>>{
            return new Promise( async (resolve, reject) =>{
                const comments = await CommentModel.find({postId: id}).catch((error : Error)=>{
                    const createdError = errorFactory('Error executing database request.', 500);
                    reject(createdError);
                });

                
                comments && resolve(comments);
                reject(new Error('Error finding requested data'))
            });
        },
        delete(id: string, userId: string) : Promise<void>{
            return new Promise(async (resolve, reject)=>{
                
                const comment = await CommentModel.findOne({_id: id })
                .catch( error => reject(errorFactory('Comment not found', 404)));
                
                if(comment?.authorId != userId) reject(errorFactory('You have no authorization to delete this comment', 406))

                const deleteComment = await comment?.delete()                
                .catch((error: Error) =>{
                    reject(error);
                });

                if(deleteComment ? deleteComment.deletedCount < 1 : true) reject(new Error('Error deleting comment.'));

                resolve();
            });
        }
    }
}