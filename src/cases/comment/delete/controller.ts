import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";
import { IDeleteComment } from "./delete";

export function deleteCommentController( deleteComment : IDeleteComment){
    return{
        async execute(req: Request, res : Response, cb: NextFunction){
            
            try { 
                const { id }= req.params;
                const { userId } = req.headers;

                if(!userId) throw errorFactory('Error on authentication.', 406);

                await deleteComment.execute(id, userId.toString());

                res.sendStatus(200);
                
            } catch (error) {
                console.log(error);
                cb(error);
            }
        }
    }
}