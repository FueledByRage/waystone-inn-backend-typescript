import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";
import { decriptToken } from "../../../utils/cryptography";
import { ISubCommunity } from "./sub";

export function SubCommunityController( sub: ISubCommunity ){
    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            try {
                const { id } = req.params;
                const { userId } = req.headers;

                if(!userId)  throw errorFactory('Token validation not sent.', 406);                

                await sub.execute(userId.toString(), id).catch((error: Error)=>{
                    const createdError = errorFactory('Error executing request.', 500);
                    throw createdError;
                });

                res.status(200).send();
            } catch (error) {
                cb(error);
            }
        }
    }
}