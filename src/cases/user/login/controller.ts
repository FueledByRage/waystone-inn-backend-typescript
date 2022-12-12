import { Request, Response, NextFunction } from "express";
import { encrypt } from "../../../utils/cryptography";
import { errorFactory } from "../../../utils/errorFactory";
import { User } from "../../../entities/user";

interface ILogin{
    execute: ( email : string, password : string ) => Promise<User>
}

export function controllerLogin(login: ILogin){
    return{
        login: async (req: Request, res: Response, cb: NextFunction)=>{
            
            try {
                const { email, password } = req.body;

                const user = await login.execute(email, password);

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