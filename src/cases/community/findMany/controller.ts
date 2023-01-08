import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";
import { IFindManyCommunity } from "./findMany";
import { decriptToken } from "../../../utils/cryptography";


export function FindManyCommunityController(findMany: IFindManyCommunity){
    return{
        async execute(req: Request, res: Response, cb:NextFunction){
            try {
                const { userId } = req.headers;
                
                if(!userId) throw errorFactory('Authentication error', 406);

                const communities = await findMany.execute(userId.toString());

                res.json(communities);
            } catch (error) {
                console.error(error);
                cb(error);
            }
        }
    }
}