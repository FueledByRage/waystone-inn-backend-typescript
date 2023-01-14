import { IComment } from "../entities/Abstractions/IComments";
import { Comment } from "../entities/Comments";
import { DTOComment } from "../entities/DTOs/DTOComments";

export interface ICommentRepository{
    create(data : DTOComment) : Promise<IComment>
    read(id: string) : Promise<Array<IComment>>
    delete(id: string, userId: string) : Promise<void>
}