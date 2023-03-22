import { Community } from "../../../entities/Community";
import { UserModel } from "../../../models/user";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";
import { Request, Response, NextFunction } from "express";
import { DTOCommunity } from "../../../entities/DTOs/DTOCommunity";
import { iCommunity } from "../../../entities/Abstractions/ICommunity";
import { httpRequestAdapter } from "../../../adapters/httpRequestAdapter";
import { IController } from "../../../adapters/adaptersImplementations/adaptRouter";

interface ICreateCommunity {
    execute(data : DTOCommunity) : Promise<iCommunity | void | null>
}

export function CreateController(create: ICreateCommunity) : IController {
    return{
        execute: async (req : httpRequestAdapter)=>{
            try {
                const { userId } = req.header;
                const { name, description } = req.body;

                if( !userId || !name || !description) throw errorFactory('Missing params', 406);

                const data = new DTOCommunity(userId.toString() , name, description);

                const createdCommunity = await create.execute(data);

                if(!createdCommunity) throw errorFactory('Error creating community', 500);

                return { status: 201, data: createdCommunity }

            } catch (error) {
                return error;
            }
        }
    }
}