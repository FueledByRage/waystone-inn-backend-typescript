import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";
import { IDeletePost } from "./delete";

export function deletePostController( deletePost : IDeletePost){
    return{
        async execute(req: Request, res : Response, cb: NextFunction){
            
            try { 
                const { id }= req.params;
                const { userId } = req.headers;
            
                if(!userId) throw errorFactory('Authorization token missing.', 406);

                await deletePost.execute(id, userId.toString());

                res.send();
                
            } catch (error) {
                console.log(error);
                cb(error);
            }
        }
    }
}