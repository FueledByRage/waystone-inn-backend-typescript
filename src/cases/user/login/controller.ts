import { Request, Response, NextFunction } from "express";
import { encrypt } from "../../../utils/cryptography";
import { errorFactory } from "../../../utils/errorFactory";
import { User } from "../../../entities/user";
import { ICryptography } from "../../../services/cryptography/ICryptography";
import { IUser } from "../../../entities/Abstractions/IUser";
import { httpRequestAdapter } from "../../../adapters/httpRequestAdapter";
import { IController } from "../../../adapters/adaptersImplementations/adaptRouter";

interface ILogin{
    execute: ( email : string, password : string ) => Promise<IUser>
}

export function controllerLogin(login: ILogin, crypto : ICryptography) : IController {
    return{
        execute: async ( req: httpRequestAdapter )=>{
            
            try {
                const { email, password } = req.body;

                const user = await login.execute(email, password);

                const token = await crypto.encrypt({id : user._id});
                
                return {token, username: user.user};
                
            } catch (error) {
                console.error(error);
                return error;
                //cb(error);
            }
        }
    }
}