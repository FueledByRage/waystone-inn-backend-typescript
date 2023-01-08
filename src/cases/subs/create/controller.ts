import { NextFunction, Request, Response } from "express";
import { DTOSub } from "../../../entities/DTOs/DTOSub";
import { errorFactory } from "../../../utils/errorFactory";


export interface ICreateSub{
    execute(data : DTOSub) : Promise<boolean>
}

export function createSubController( createSub : ICreateSub ){

    return{
         async execute  (req : Request, res : Response, next : NextFunction){
            try {
                const { communityId } = req.params;
                const { userId } = req.headers;

                if(!userId) throw errorFactory('Authentication error', 406);

                const data = new DTOSub(userId?.toString(), communityId, false);

                const created = await createSub.execute(data);

                if(created) return res.status(201).send();
                
                throw errorFactory('Something went wrong');
            } catch (error) {
                console.error(error);
                next(error);
            }

        }
    }
}