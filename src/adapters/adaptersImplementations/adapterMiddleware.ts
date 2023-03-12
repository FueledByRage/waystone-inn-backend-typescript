import { Response, Request, NextFunction } from "express"
import { httpRequestAdapter } from "../httpRequestAdapter"
import { expressReqAdapter } from "./expressRequestAdapter"

export interface IMiddleware{
    execute: ( httpRequest : httpRequestAdapter ) => any
}

export const adapterMiddleware = ( middleware : IMiddleware )=>{
    return async ( req : Request, res : Response, next: NextFunction ) =>{
        const request = expressReqAdapter(req);
        const middlewareResponse = await middleware.execute(request);
        req = middlewareResponse;
        next();
    }
}