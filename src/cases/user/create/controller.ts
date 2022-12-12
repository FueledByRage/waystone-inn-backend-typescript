import { User } from "../../../entities/user";
import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";

interface ICreateUser{
    execute: ( user : User )=> Promise<User | void | null>
}

export function CreateController(create: ICreateUser){
    return{
        
        execute: async (req: Request, res: Response, cb: NextFunction)=>{
            try {
                const { user, name, email, password } = req.body;
                if(!user || !name || !email || !password) throw errorFactory('Missing params', 406);

                const newUser = new User(user, name, password, email);
                
                const createdUser = await create.execute(newUser);

                res.status(201).send(createdUser);
            } catch (error) {
                cb(error);
            }
        }
    }
}