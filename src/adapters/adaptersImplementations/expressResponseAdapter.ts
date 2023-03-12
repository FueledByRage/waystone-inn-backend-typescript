import { Response } from "express";
import { httpResponseAdapter } from "../httpResponseAdapter";

export const expressResAdapter = ( res : Response ) : httpResponseAdapter =>{
    return{
        send: ( status?: number, body? : any ) => res.status(status || 200 ).send(body)
    }
}