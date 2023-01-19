import e from "express";
import { IUser } from "../../../entities/Abstractions/IUser";
import { DTOUser } from "../../../entities/DTOs/DTOUser";
import { User } from "../../../entities/user";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { DTOSendMessageStream } from "../../../services/DTOs/DTOsendMessageStream";
import { IMessageStream } from "../../../services/messageStream/IMessageStream";
import { errorFactory } from "../../../utils/errorFactory";
import { ICreateUser } from "./controller";
import * as dotenv from 'dotenv';
dotenv.config();

export function CreateUser(userRepository: IUserRepository, messageBroker : IMessageStream) : ICreateUser  {

    const emailUserIsInValid = ( user : DTOUser) : boolean =>{
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    
        if(emailRegex.test(user.email)) return false

        return true;
    }

    const checkCredentials = async (data : DTOUser) : Promise<string | null>=>{
        return new Promise( async (resolve, reject) =>{
            const user = userRepository.getByEmail(data.email);
            const username = userRepository.read(data.user);
            const results = await Promise.all(
                [
                    user,
                    username
                ]
            );
            if(results[0]) return resolve('Email already registered');
            if(results[1]) return resolve('This username has been taken');
            return resolve(null);
        });
    }

    return{
        execute: (user: DTOUser) : Promise<IUser> => {
            return new Promise(async (resolve, reject)=>{
                try {

                    if(emailUserIsInValid(user)) throw errorFactory('This is not a valid email format', 406);
                    
                    const credentialsError = await checkCredentials(user);
                    
                    if(credentialsError) return reject( errorFactory(credentialsError, 406));
                    
                    const newUser = await userRepository.create(user);

                    const { INN_EMAIL } = process.env;

                    const message = {
                        emailOwner : 'The Waystone Inn',
                        emailFrom : INN_EMAIL,
                        emailTo : user.email,
                        subject : 'User register',
                        text: 'Welcome to The Waystone Inn community.' 
                    }

                    const dataMessageBroker = new DTOSendMessageStream('msEmail', message);

                    messageBroker.sendMessage(dataMessageBroker);
                    
                    resolve(newUser);
                    
                } catch (error) {
                    reject(error);
                }
                    
            }) 
        }
    }
}