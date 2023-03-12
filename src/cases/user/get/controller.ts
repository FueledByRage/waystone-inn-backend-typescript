import { User } from "../../../entities/user";
import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";
import { IUser } from "../../../entities/Abstractions/IUser";
import { httpRequestAdapter } from "../../../adapters/httpRequestAdapter";
import { IController } from "../../../adapters/adaptersImplementations/adaptRouter";

interface IGetUser{
    execute: (username : string) => Promise<IUser | void | null>
}

export const getUserController = ( get : IGetUser ) : IController =>{

    return{
        execute: async (req : httpRequestAdapter) =>{
            try {

                const { username } = req.params;
    
                if(!username) throw errorFactory('Missing params', 406);

                const user = await get.execute(username);

                if(!user) throw errorFactory('User not found', 404);
                return user;
                //res.send(user);
            } catch (error) {
                return error;
                //next(error);
            }
        }
    }

}