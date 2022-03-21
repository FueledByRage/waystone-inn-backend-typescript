import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";
import { decriptToken } from "../../../utils/cryptography";
import { IUnsubCommunity } from "./unsub";

export function UnsubCommunityController( unsub: IUnsubCommunity ){
    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            try {
                const { id } = req.params;
                const { token } = req.headers;

                if(!token){ 
                    const createdError = errorFactory('Token validation not sent.', 406);
                    cb(createdError);
                }

                //@ts-ignore
                const userId = await decriptToken(token)
                .catch((e: Error)=>{
                    const createdError = errorFactory('Error validating token', 406);
                    cb(createdError);
                });

                //@ts-ignore
                await unsub.execute(userId, id).catch((error: Error)=>{
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