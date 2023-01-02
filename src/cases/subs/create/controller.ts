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
                const { token } = req.headers;

                if(!token) throw errorFactory('Error on validation', 406);
                //@ts-ignore
                const data = new DTOSub(token, communityId, false);

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