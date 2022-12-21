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
                const { postId } = req.body;
                const { token } = req.headers;
    
                if(!token) throw errorFactory('Authentication required', 406);

                //@ts-ignore
                const userId = await decriptToken(token).catch(e => { 
                    throw errorFactory(e.message, 406);
                }); 

                const data = new DTOLike(userId, postId);

                const created = await createLike.execute(data);

                if(created) res.status(201).send();

                throw errorFactory('Error saving like', 500);
            } catch (error) {
                next(error);
            }
        }
    }
}