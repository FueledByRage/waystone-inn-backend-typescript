import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";
import { IDeleteComment } from "./delete";

export function deleteCommentController( deleteComment : IDeleteComment){
    return{
        async execute(req: Request, res : Response, cb: NextFunction){
            
            try { 
                const { id }= req.params;
                const { token } = req.headers;

                if(!token) throw errorFactory('Authorization token missing.', 406);
                //@ts-ignore
                const userId = await decriptToken(token).catch((error: Error)=>{
                    throw errorFactory('Invalid authorization token.', 406);
                }); 

                await deleteComment.execute(id, userId);

                res.send();
                
            } catch (error) {
                console.log(error);
                cb(error);
            }
        }
    }
}