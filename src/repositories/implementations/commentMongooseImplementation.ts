import { IComment } from "../../entities/Abstractions/IComments";
import { Comment } from "../../entities/Comments";
import { DTOComment } from "../../entities/DTOs/DTOComments";
import { CommentModel } from "../../models/comment";
import { errorFactory } from "../../utils/errorFactory";
import { ICommentRepository } from "../ICommentRepository";


export function MongooseComment() : ICommentRepository{
    return{
        create(data : DTOComment) : Promise<IComment> {
            return new Promise(async (resolve, reject) =>{
                try {
                    
                    const newComment = await CommentModel.create(data);
                    
                    resolve(newComment);
                    
                } catch (error) {
                    console.error(error);
                    reject(error);
                }
            });
        },
        read(id: string) : Promise<Array<IComment>>{
            return new Promise( async (resolve, reject) =>{
                try {
                    const comments = await CommentModel.find({ postId: id }).populate('authorId');
                    comments && resolve(comments);
                    reject(new Error('Error finding requested data'))
                    
                } catch (error) {
                    reject(error);
                }
            });
        },
        delete(id: string, userId: string) : Promise<void>{
            return new Promise(async (resolve, reject)=>{
                try {
                    const comment = await CommentModel.findOne({_id: id });
                    
                    if(comment?.authorId != userId) reject(errorFactory('You have no authorization to delete this comment', 406))
    
                    const deleteComment = await comment?.delete();
    
                    if(deleteComment.deletedCount < 1 ) reject(new Error('Error deleting comment.'));
    
                    resolve();
                    
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
}