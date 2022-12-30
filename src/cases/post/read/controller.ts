import { IReadPost } from "./get";
import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";

export function readPostController(readPosts: IReadPost){
    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            try {
                const { id } = req.params;
                const { token } = req.headers;
            
                const post = await readPosts.execute(id, token );
                res.json(post);
            } catch (error) {
                cb(error);
            }
        }
    }
}