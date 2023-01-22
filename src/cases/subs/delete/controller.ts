import { NextFunction, Request, Response } from "express"
import { DTOSub } from "../../../entities/DTOs/DTOSub";
import { errorFactory } from "../../../utils/errorFactory";


export interface IDeleteSub{
    execute( data : DTOSub ) :  Promise<void> 
}


export const deleteSubController = ( deleteSub : IDeleteSub ) =>{

    return{
        execute : async (req : Request, res: Response, cb : NextFunction ) =>{
            try {
                const { communityId } = req.params;
                const { userId } = req.headers;

                if(!userId) throw errorFactory('Validation error', 406);

                const data = new DTOSub(userId.toString(), communityId, false);

                await deleteSub.execute(data);

                res.sendStatus(204);
            } catch ( error ) {
                console.error(error);
                cb(error);
            }
        }
    }
}