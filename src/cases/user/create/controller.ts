import { User } from "../../../entities/user";
import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";
import { DTOUser } from "../../../entities/DTOs/DTOUser";
import { encrypt } from "../../../utils/cryptography";
import * as dotenv from 'dotenv';
import { ICryptography } from "../../../services/cryptography/ICryptography";
import { IMessageStream } from "../../../services/messageStream/IMessageStream";
import { IUser } from "../../../entities/Abstractions/IUser";
import { httpRequestAdapter } from "../../../adapters/httpRequestAdapter";
import { IController } from "../../../adapters/adaptersImplementations/adaptRouter";
dotenv.config();

export interface ICreateUser{
    execute: ( user : DTOUser )=> Promise<IUser>
}

export function CreateController(create: ICreateUser, cryptography : ICryptography ) : IController {
    return{
        execute: async (req : httpRequestAdapter)=>{
            try {
                const { user, name, email, password } = req.body;
                console.log(req);
                if(!user || !name || !email || !password) throw errorFactory('Missing params', 406);
                
                const newUser = new DTOUser(user, name, password, email);
                const createdUser = await create.execute(newUser);

                const token = await cryptography.encrypt({id: createdUser._id});
                return { status: 201, data: token };
            } catch (error) {
                return error;
            }
        }
    }
}