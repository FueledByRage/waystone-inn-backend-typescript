import { IGetPostsFeed } from "./get";
import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";
import { DTOGetPosts } from "../../../entities/DTOs/DTOGetPosts";

export function getPostsFeedController(getPostsFeed: IGetPostsFeed){
    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            try {
                const { page, registers } = req.params;
                const { userId } = req.headers;

                if(!userId) throw errorFactory('Missing authorization token.', 406);
                
                const data = new DTOGetPosts( userId.toString(), parseInt(page), parseInt(registers) );

                const response = await getPostsFeed.execute(data);

                res.json(response);
            } catch (error) {
                cb(error);
            }
        }
    }
}