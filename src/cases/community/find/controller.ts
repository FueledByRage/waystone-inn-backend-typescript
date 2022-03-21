import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";
import { decriptToken } from "../../../utils/cryptography";



export function findController(find: Function){
    return{
        execute: async (req: Request, res: Response, cb: NextFunction)=>{
            try {
                const { id } = req.params;
                const { token } = req.headers;

                let community = await find(id)
                .catch( (e: Error) =>{ throw errorFactory('Error finding community.', 404) });
                
                if(!token) {
                    community.members = undefined;
                    return res.status(200).json({community: community, sub: false});
                    
                };

                //@ts-ignore
                const userId = await decriptToken(token).catch((error: Error) =>{
                    const createdError = errorFactory('Error validating token.', 406);
                    throw createdError;
                });
                
                const sub = community.members.includes(userId);
                community.members = undefined;
                
                res.status(200).json({community: community, sub: sub});
        
            } catch (error) {
                cb(error);
            }
        }
    }
}