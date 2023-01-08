import { Community } from "../../../entities/Community";
import { UserModel } from "../../../models/user";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";
import { Request, Response, NextFunction } from "express";
import { DTOCommunity } from "../../../entities/DTOs/DTOCommunity";
import { iCommunity } from "../../../entities/ICommunity";

interface ICreateCommunity {
    execute(data : DTOCommunity) : Promise<iCommunity | void | null>
}

export function CreateController(create: ICreateCommunity){
    return{
        execute: async (req: Request, res: Response, cb: NextFunction)=>{
            try {
                const { userId } = req.headers;
                const { name, description } = req.body;

                console.log(userId);
                if( !userId || !name || !description) throw errorFactory('Missing params', 406);

                
                const data = new DTOCommunity(userId.toString() , name, description);

                const createdCommunity = await create.execute(data);

                if(!createdCommunity) throw errorFactory('Error creating community', 500);

                res.status(201).json(createdCommunity);
            } catch (error) {
                cb(error);
            }
        }
    }
}