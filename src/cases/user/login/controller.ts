import { Request, Response, NextFunction } from "express";
import { encrypt } from "../../../utils/cryptography";
import { errorFactory } from "../../../utils/errorFactory";

export function controllerLogin(login: Function){
    return{
        login: async (req: Request, res: Response, cb: NextFunction)=>{
            
            try {
                const { email, password } = req.body;

                const user = await login(email, password).catch( (e: Error)=>{
                    throw e;
                });

                const token = await encrypt({id: user._id}).catch( (e: Error)=>{
                    throw errorFactory('Error generating user token.', 500);
                });
                res.send({token: token, username: user.user});
                
            } catch (error) {
                cb(error);
            }
        }
    }
}