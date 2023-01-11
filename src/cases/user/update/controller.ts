import { NextFunction, Request, Response } from "express";
import { DTOUpdateUser } from "../../../entities/DTOs/DTOUpdateUser";
import { IUser } from "../../../entities/IUser";
import { errorFactory } from "../../../utils/errorFactory";
import * as dotenv from 'dotenv';

dotenv.config();

export interface IUpdateUser{
    execute( data : DTOUpdateUser ) : Promise<boolean>
}

export const updateUserController = ( updateUser : IUpdateUser ) =>{
    return{
        execute: async ( req : Request, res : Response, cb : NextFunction ) => {

            try {                        
                const { userId } = req.headers;
                const { username, name } = req.body;
                const key = req.file?.filename;
            
                if(!userId) throw errorFactory( 'Missing user authentication');
                const profileURL = key && `${process.env.UPLOAD_URL}/user/${key}`;
                
                const data = new DTOUpdateUser(userId.toString(), username, name, profileURL);
                
                const updated = await updateUser.execute(data);
                
                if(updated) return res.sendStatus(201);

                throw errorFactory('Error updating data');
            } catch (error) {
                console.error(error);
                cb(error);
            }
        }
    }
}