import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";

export function findController(find: Function){
    return{
        execute: async (req: Request, res: Response, cb: NextFunction)=>{
            try {
                const { id } = req.params;
                
                const community = await find(id).catch( (e: Error) =>{ throw errorFactory('Error finding community.', 404) });
                
                res.status(200).json(community);
        
            } catch (error) {
                cb(error);
            }
        }
    }
}