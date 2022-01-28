import { Model } from "mongoose";
import { UserModel,IUserSchema } from "../../models/user";
import { IUserRepository } from "../IUserRepository";
import { IUser } from "../../entities/IUser";

export class UserMongoose implements IUserRepository{
    create(user: Object): Promise<IUser> {
        return new Promise(async (resolve, reject)=>{
            const newUser = await UserModel.create(user).catch((e: Error) =>{
                reject(e);
            });
            if(!newUser) reject(new Error('Error saving user'));
            
            //@ts-ignore
            await newUser.save();
            //@ts-ignore
            resolve(newUser);
        });

    }
    read(id: string): Promise<IUser> {
        return new Promise(async (resolve, reject)=>{
            const user = await UserModel.findById(id).catch( e =>{})
            if(!user) return reject('User not found.');
            return resolve(user);
        })
    }
    update(id: string, data: Object): Promise<boolean> {
        return new Promise(async (resolve, reject)=>{
            await UserModel.updateOne({_id: id}, data).catch( e =>{ reject(false)});

            resolve(true);
        })
    }
    delete(id: string): Promise<boolean> {
        return new Promise(async (resolve, reject)=>{
            await UserModel.deleteOne({_id: id}).catch( e=>{ reject('Error deleting user.'); });

            resolve(true);
        });
    }

}