import { Request } from "express";
import { httpRequestAdapter } from "../httpRequestAdapter";

export const expressReqAdapter = ( request : Request ) : httpRequestAdapter => {
    return{
        params: request.params,
        body: request.body,
        header : request.headers,
        url: request.url,
        file : request.file 
    }
} 