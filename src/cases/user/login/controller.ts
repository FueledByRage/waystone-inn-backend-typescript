import { Request, Response, NextFunction } from "express";
import { encrypt } from "../../../utils/cryptography";
import { errorFactory } from "../../../utils/errorFactory";
import { User } from "../../../entities/user";
import { ICryptography } from "../../../services/cryptography/ICryptography";
import { IUser } from "../../../entities/Abstractions/IUser";

interface ILogin{
    execute: ( email : string, password : string ) => Promise<IUser>
}

export function controllerLogin(login: ILogin, crypto : ICryptography){
    return{
        login: async (req: Request, res: Response, cb: NextFunction)=>{
            
            try {
                const { email, password } = req.body;

                const user = await login.execute(email, password);

                const token = await crypto.encrypt({id : user._id});
                
                res.send({token, username: user.user});
                
            } catch (error) {
                console.error(error);
                cb(error);
            }
        }
    }
}