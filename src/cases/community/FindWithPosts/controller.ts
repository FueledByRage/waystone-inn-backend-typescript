import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";
import { IFindCommunityPost } from "./find";

export function findCommunityPosts(find: IFindCommunityPost){

    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            const { id, page, registers } = req.params;

            const response = await find.execute(id, parseInt(page), parseInt(registers));

        }
    }
}