import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";
import { ICreateComment } from "./create";
import { decriptToken } from "../../../utils/cryptography";
import { DTOComment } from "../../../entities/DTOs/DTOComments";


export function createCommentController(createComment: ICreateComment){

    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            try {
                const { id, comment } = req.body;
                const { userId } = req.headers;
    
                if(!id || !userId || !comment) throw errorFactory('Missing param.', 406);

                const data = new DTOComment(userId.toString(), id, comment);

                const newComment = await createComment.execute(data); 

                res.status(201).json(newComment);
                
            } catch (error) {
                cb(error);
            }
        }
    }
}