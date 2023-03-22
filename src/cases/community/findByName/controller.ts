import { IFindByName } from "./findByName";
import { Request, Response, NextFunction } from "express";
import { httpRequestAdapter } from "../../../adapters/httpRequestAdapter";

export function FindByNameController( find: IFindByName ){

    return{
        async execute(req: httpRequestAdapter){

            try {
                const { name } = req.params;
    
                const communities = await find.execute(name);
                return { data: communities };
            } catch (error) {
                return error;
            }



        }
    }
}