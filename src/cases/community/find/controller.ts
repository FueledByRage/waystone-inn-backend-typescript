import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";
import { decriptToken } from "../../../utils/cryptography";
import { iCommunity } from "../../../entities/Abstractions/ICommunity";
import { httpRequestAdapter } from "../../../adapters/httpRequestAdapter";

export interface IFindCommunityOutput{
    community : iCommunity | null | void,
    sub : boolean | undefined
} 
interface IFindCommunity{
    execute(id : string, userId : string ) : Promise<IFindCommunityOutput>
}

export function findController(find: IFindCommunity){
    return{
        execute: async (req: httpRequestAdapter)=>{
            try {
                const { id } = req.params;
                const { token } = req.header;

                const response = await find.execute(id, token?.toString() || '');
                return { status : 200, data: response }
        
            } catch (error) {
                console.error(error);
                return error;
            }
        }
    }
}