import { IFindByName } from "./findByName";
import { Request, Response, NextFunction } from "express";
import { errorFactory } from "../../../utils/errorFactory";

export function FindByNameController( find: IFindByName ){

    return{
        async execute(req: Request, res: Response, cb: NextFunction){

            try {
                const { name } = req.params;
    
                const communities = await find.execute(name)
                .catch((error: Error) =>{
                    const createdError = errorFactory('Error executing search');
                    throw createdError;
                });
                
                res.json(communities);
            } catch (error) {
                cb(error);
            }



        }
    }
}