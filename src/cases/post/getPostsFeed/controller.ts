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
                const { token } = req.headers;

                if(!token) throw errorFactory('Missing authorization token.', 406);
                
                //@ts-ignore
                const data = new DTOGetPosts( token, parseInt(page), parseInt(registers) );

                let response = await getPostsFeed.execute(data);

                res.json(response);
            } catch (error) {
                cb(error);
            }
        }
    }
}