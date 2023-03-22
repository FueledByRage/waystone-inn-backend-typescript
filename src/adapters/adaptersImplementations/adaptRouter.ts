import { Response, Request, NextFunction } from "express"
import { httpRequestAdapter } from "../httpRequestAdapter"
import { expressReqAdapter } from "./expressRequestAdapter"

export interface IController{
    execute : ( req : httpRequestAdapter ) => any
}

export const adaptRouter = ( controller : IController ) =>{
    return async (req : Request, res : Response, next: NextFunction) =>{
        const request = expressReqAdapter(req);
        const response = await controller.execute(request);
        if(typeof response == "number") return res.sendStatus(response);
        else if(response instanceof Error) return next(response);
        return res.status(response.status || 200).send(response.data);
    }
}