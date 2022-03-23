import { IReadComment } from "./get";
import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";

export function readCommentsController(readComments: IReadComment){
    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            try {
                const { id } = req.params;
            
                const comments = await readComments.execute(id)
                .catch((error: Error) =>{
                    const createdError = errorFactory('Error reaching comments', 404);
                    throw createdError;
                });

                res.json(comments);
            } catch (error) {
                cb(error);
            }
        }
    }
}