import { IReadPosts } from "./get";
import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";
import { DTOPostByCommunity } from "../../../entities/DTOs/DTOPostByCommunity";

export function readPostsController(readPosts: IReadPosts){
    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            try {
                const { id, page, registers } = req.params;
                const { userId } = req.headers;
                
                if(!userId) throw errorFactory('Missing authorization token.', 406);

                const data = new DTOPostByCommunity(userId.toString() , id, parseInt(page), parseInt(registers));
                
                const response = await readPosts.execute(data);

                res.json(response);
            } catch (error) {
                cb(error);
            }
        }
    }
}