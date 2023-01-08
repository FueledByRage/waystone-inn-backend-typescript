import { IReadPost } from "./get";
import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";

export function readPostController(readPosts: IReadPost){
    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            try {
                const { id } = req.params;
                const { userId } = req.headers;
            
                const post = await readPosts.execute(id, userId?.toString() );
                
                if(!post) throw errorFactory('Error finding post', 404);

                res.json(post);
            } catch (error) {
                cb(error);
            }
        }
    }
}