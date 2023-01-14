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
                const { postId } = req.params;
                const { userId } = req.headers;
    
                if(!userId) throw errorFactory('Authentication required', 406);

                const data = new DTOLike(userId.toString(), postId);

                const removed = await removeLike.execute(data);

                if(removed) return res.status(204).send();

                throw errorFactory('Error removing like');
            } catch (error) {
                console.error(error);
                next(error);
            }
        }
    }
}