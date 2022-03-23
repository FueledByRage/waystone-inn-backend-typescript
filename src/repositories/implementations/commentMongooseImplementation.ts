import { Comment } from "../../entities/Comments";
import { IComment } from "../../entities/IComments";
import { CommentModel } from "../../models/comment";
import { errorFactory } from "../../utils/errorFactory";
import { ICommentRepository } from "../ICommentRepository";


export function MongooseComment() : ICommentRepository{
    return{
        create(comment: Comment) : Promise<IComment> {
            return new Promise(async (resolve, reject) =>{
                //create a new comment

                const newComment = await CommentModel.create(comment).catch((error : Error)=>{
                    const createdError = errorFactory('Error executing database request.', 500);
                    reject(createdError);
                });
                
                //@ts-ignore
                resolve(newComment);
            });
        },
        read(id: string) : Promise<Array<IComment>>{
            return new Promise( async (resolve, reject) =>{
                const comments = await CommentModel.find({postId: id}).catch((error : Error)=>{
                    const createdError = errorFactory('Error executing database request.', 500);
                    reject(createdError);
                });

                //@ts-ignore
                resolve(comments);
            });
        }
    }
}