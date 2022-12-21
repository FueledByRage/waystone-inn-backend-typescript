import { User } from "../../../entities/user";
import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";
import { DTOUser } from "../../../entities/DTOs/DTOUser";
import { encrypt } from "../../../utils/cryptography";

interface ICreateUser{
    execute: ( user : DTOUser )=> Promise<User | void | null>
}

export function CreateController(create: ICreateUser){
    return{
        
        execute: async (req: Request, res: Response, cb: NextFunction)=>{
            try {
                const { user, name, email, password } = req.body;
                if(!user || !name || !email || !password) throw errorFactory('Missing params', 406);

                const newUser = new DTOUser(user, name, password, email);
                const createdUser = await create.execute(newUser);

                const token = createdUser && await encrypt({id: createdUser._id});

                res.status(201).send({ token, username : user });
            } catch (error) {
                cb(error);
            }
        }
    }
}