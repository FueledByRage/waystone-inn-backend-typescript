import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";
import { ICreateComment } from "./create";
import { decriptToken } from "../../../utils/cryptography";


export function createCommentController(createComment: ICreateComment){

    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            try {
                const { token } = req.headers;
                const { id, comment } = req.body;
    
                if(!id || !token || !comment) throw errorFactory('Missing param.', 406);
                
                //@ts-ignore
                const userId = await decriptToken(token)
                .catch((error: Error) =>{
                    throw errorFactory('Error decripting token', 406);
                });


                const newComment = createComment.execute(id, userId, comment);
                

                res.status(201).json(newComment);
                
            } catch (error) {
                cb(error);
            }
        }
    }
}