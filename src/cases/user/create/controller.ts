import { User } from "../../../entities/user"
import { NextFunction, Request, Response } from "express"
import { errorFactory } from "../../../utils/errorFactory";

export function CreateController(create: Object){
    return{
        
        execute: async (req: Request, res: Response, cb: NextFunction)=>{
            try {
                const { user, name, email, password } = req.body;
                if(!user || !name || !email || !password) throw errorFactory('Missing params', 406);

                const newUser = new User(user, name, password, email);
                
                //@ts-ignore
                const createdUser = await create.execute(newUser).catch((e: Error)=>{
                    throw errorFactory('Error saving user');
                });
                res.status(201).send(createdUser);
                
            } catch (error) {
                //@ts-ignore
                cb(error);
            }
        }
    }
}