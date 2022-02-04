import { Request, Response } from "express";

export function errorMiddleware(error: Error, req: Request, res: Response){

    //@ts-ignore
    const { status, message } = error; 

    res.status(status == 0 ? 500 : status).json({error: message});
}