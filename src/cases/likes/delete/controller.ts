import { NextFunction, Request, Response } from "express"
import { DTOLike } from "../../../entities/DTOs/DTOLikes"
import { decriptToken } from "../../../utils/cryptography"
import { errorFactory } from "../../../utils/errorFactory"

export interface IRemoveLike{
    execute(DTOLike : DTOLike) : Promise<boolean> 
}

export const removeLikeController = ( removeLike : IRemoveLike )=>{
    return{
        async execute(req: Request, res : Response, next : NextFunction){
            try {
                const { postId } = req.body;
                const { token } = req.headers;
    
                if(!token || typeof token != 'string') throw errorFactory('Authentication required', 406);


                const data = new DTOLike(token, postId);

                const removed = await removeLike.execute(data);

                if(removed) res.status(201).send();

                throw errorFactory('Error removing like');
            } catch (error) {
                next(error);
            }
        }
    }
}