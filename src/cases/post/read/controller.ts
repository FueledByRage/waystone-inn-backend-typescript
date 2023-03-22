import { IReadPost } from "./get";
import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";
import { httpRequestAdapter } from "../../../adapters/httpRequestAdapter";

export function readPostController(readPosts: IReadPost){
    return{
        async execute(req: httpRequestAdapter){
            try {
                const { id } = req.params;
                const { userId } = req.header;
            
                const post = await readPosts.execute(id, userId?.toString() );
                
                if(!post) throw errorFactory('Error finding post', 404);

                return { data: post }
            } catch (error) {
                return error;
            }
        }
    }
}