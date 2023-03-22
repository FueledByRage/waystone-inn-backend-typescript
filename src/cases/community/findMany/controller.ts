import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";
import { IFindManyCommunity } from "./findMany";
import { decriptToken } from "../../../utils/cryptography";
import { httpRequestAdapter } from "../../../adapters/httpRequestAdapter";


export function FindManyCommunityController(findMany: IFindManyCommunity){
    return{
        async execute(req: httpRequestAdapter){
            try {
                const { token } = req.header;
                
                //if(!token) throw errorFactory('Authentication error', 406);

                const communities = await findMany.execute(token.toString());

                return { data: communities }
            } catch (error) {
                console.error(error);
                return error;
            }
        }
    }
}