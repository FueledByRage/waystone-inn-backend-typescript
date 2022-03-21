import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";
import { IFindManyCommunity } from "./findMany";
import { decriptToken } from "../../../utils/cryptography";


export function FindManyCommunityController(findMany: IFindManyCommunity){
    return{
        async execute(req: Request, res: Response, cb:NextFunction){
            try {
                const { token } = req.headers;

                if(!token){
                    const createdError = errorFactory('Require validation token.', 406);
                    cb(createdError);
                }

                //@ts-ignores
                const userId = await decriptToken(token).catch((error: Error) =>{
                    const createdError = errorFactory('Error validating token.', 406);
                    throw createdError;
                });
                
                //@ts-ignore
                const communities = await findMany.execute(userId)
                .catch((e: Error)=>{
                    const createdError = errorFactory('Error finding data.');
                    
                    throw createdError;
                });

                res.json(communities);
                
            } catch (error) {
                cb(error);
            }
        }
    }
}