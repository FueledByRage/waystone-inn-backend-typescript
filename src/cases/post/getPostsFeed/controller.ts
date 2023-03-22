import { IGetPostsFeed } from "./get";
import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";
import { DTOGetPosts } from "../../../entities/DTOs/DTOGetPosts";
import { IController } from "../../../adapters/adaptersImplementations/adaptRouter";
import { httpRequestAdapter } from "../../../adapters/httpRequestAdapter";

export function getPostsFeedController(getPostsFeed: IGetPostsFeed) : IController {
    return{
        async execute(req: httpRequestAdapter){
            try {
                const { page, registers } = req.params;
                const { userId } = req.header;

                if(!userId) throw errorFactory('Missing authorization token.', 406);
                
                const data = new DTOGetPosts( userId.toString(), parseInt(page), parseInt(registers) );

                const response = await getPostsFeed.execute(data);

                return { data : response }
            } catch (error) {
                return error;
            }
        }
    }
}