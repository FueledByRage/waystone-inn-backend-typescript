import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";
import { IFindCommunityPost } from "./find";
import { DTOGetPosts } from "../../../entities/DTOs/DTOGetPosts";

export function findCommunityPosts(find: IFindCommunityPost){

    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            
            try {
                
                const { id, page, registers } = req.params;
                const { token } = req.headers;

                const data = new DTOGetPosts(id, parseInt(page), parseInt(registers))

                const response = await find.execute(data, token || '');
                
                res.send(response);
            } catch (error) {
                cb(error);   
            }
        }
    }
}