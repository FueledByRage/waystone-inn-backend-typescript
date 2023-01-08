import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";
import { decriptToken } from "../../../utils/cryptography";
import { iCommunity } from "../../../entities/ICommunity";

export interface IFindCommunityOutput{
    community : iCommunity | null | void,
    sub : boolean | undefined
} 
interface IFindCommunity{
    execute(id : string, userId : string ) : Promise<IFindCommunityOutput>
}

export function findController(find: IFindCommunity){
    return{
        execute: async (req: Request, res: Response, cb: NextFunction)=>{
            try {
                const { id } = req.params;
                const { userId } = req.headers;
                const response = await find.execute(id, userId?.toString() || '');
                
                res.status(200).json(response);
        
            } catch (error) {
                console.error(error);
                cb(error);
            }
        }
    }
}