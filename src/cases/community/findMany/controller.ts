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

                //@ts-ignore
                const userId = await decriptToken(token);
                
                //@ts-ignore
                const communities = await findMany.execute(userId);

                res.json(communities);
                
            } catch (error) {
                cb(error);
            }
        }
    }
}