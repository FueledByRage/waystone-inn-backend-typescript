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
                console.log(token)

                //@ts-ignore
                const userId = await decriptToken(token);
                
                console.log(userId);
                //@ts-ignore
                const communities = await findMany.execute(userId);

                res.json(communities);
                
            } catch (error) {
                console.error(error);
                cb(error);
            }
        }
    }
}