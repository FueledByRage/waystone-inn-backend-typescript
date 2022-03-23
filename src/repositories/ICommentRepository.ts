import { IComment } from "../entities/IComments";
import { Comment } from "../entities/Comments";

export interface ICommentRepository{
    create(comment: Comment) : Promise<IComment>
    read(id: string) : Promise<Array<IComment>>
}