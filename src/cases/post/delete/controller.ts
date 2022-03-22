import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";
import { IDeletePost } from "./delete";

export function deletePostController( deletePost : IDeletePost){
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

                await deletePost.execute(id, userId).catch((error: Error) =>{
                    throw errorFactory('Error executing action.', 500);
                });

                res.send();
                
            } catch (error) {
                cb(error);
            }
        }
    }
}