import { NextFunction, Request, Response } from "express"
import { DTOLike } from "../../../entities/DTOs/DTOLikes"
import { decriptToken } from "../../../utils/cryptography"
import { errorFactory } from "../../../utils/errorFactory"

export interface ICreateLike{
    execute(DTOLike : DTOLike) : Promise<boolean> 
}

export const createLikeController = ( createLike : ICreateLike )=>{
    return{
        async execute(req: Request, res : Response, next : NextFunction){
            try {
                const { postId } = req.params;
                const { userId } = req.headers;
    
                if(!userId) throw errorFactory('Authentication required', 406);

                const data = new DTOLike(userId.toString() , postId);

                const created = await createLike.execute(data);

                if(created) return res.sendStatus(201);

                throw errorFactory('Error saving like', 500);
            } catch (error) {
                next(error);
            }
        }
    }
}