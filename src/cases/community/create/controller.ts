import { Community } from "../../../entities/Community";
import { UserModel } from "../../../models/user";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";
import { Request, Response, NextFunction } from "express";

export function CreateController(create: Function){
    return{
        execute: async (req: Request, res: Response, cb: NextFunction)=>{
            try {
                const { token } = req.headers;
                const { name, description } = req.body;

                if(!token || !name || !description) throw errorFactory('Missing params', 406);

                //@ts-ignore
                const userId = await decriptToken(token).catch((e)=>{ errorFactory('Authorization token error') })


                //@ts-ignore
                const createdCommunity = await create(name, description, userId).catch(e =>{ throw e });

                res.status(201).json(createdCommunity);

            } catch (error) {
                cb(error);
            }
        }
    }
}