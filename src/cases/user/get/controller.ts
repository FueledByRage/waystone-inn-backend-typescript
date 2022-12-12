import { User } from "../../../entities/user";
import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";

interface IGetUser{
    execute: (username : string) => Promise<User | void | null>
}

export const getUserController = ( get : IGetUser )=>{

    return{
        execute: async (req : Request, res : Response, next : NextFunction) =>{
            try {

                const { username } = req.params;
    
                if(!username) throw errorFactory('Missing params', 406);

                const user = await get.execute(username);

                if(!user) throw errorFactory('User not found', 404);

                res.send(user);
            } catch (error) {
                next(error);
            }
        }
    }

}