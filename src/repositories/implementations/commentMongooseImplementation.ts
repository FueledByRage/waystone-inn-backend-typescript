import { Comment } from "../../entities/Comments";
import { IComment } from "../../entities/IComments";
import { CommentModel } from "../../models/comment";
import { ICommentRepository } from "../ICommentRepository";


export function MongooseComment() : ICommentRepository{
    return{
        create(comment: Comment) : Promise<IComment> {
            return new Promise(async (resolve, reject) =>{
                //create a new comment

                const newComment = await CommentModel.create(comment);
                
                resolve(newComment);
            });
        }
    }
}