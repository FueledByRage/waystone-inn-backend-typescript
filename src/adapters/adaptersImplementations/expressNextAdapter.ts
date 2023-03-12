import { Request, Response, NextFunction } from "express";
import { httpNextAdapter } from "../httpNextAdapter";

export const expressNextAdapter = ( cb : NextFunction ) : httpNextAdapter =>{
    return{
        next : () => cb()
    }
}
