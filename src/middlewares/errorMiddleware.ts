import { Request, Response, NextFunction } from "express";

export function errorMiddleware(error: Error, req: Request, res: Response, next : NextFunction){

    if(!error) return;
    //@ts-ignore
    const { status, message } = error;
    
    res.status(!status ? 500 : status).send(message);
}