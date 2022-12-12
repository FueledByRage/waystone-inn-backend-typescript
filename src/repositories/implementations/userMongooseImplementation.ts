import { Model } from "mongoose";
import { UserModel,IUserSchema } from "../../models/user";
import { IUserRepository } from "../IUserRepository";
import { IUser } from "../../entities/IUser";
import { User } from "../../entities/user";
import { errorFactory } from "../../utils/errorFactory";

export function UserMongoose(): IUserRepository{
    return{
    create(user: User): Promise< IUser | void | null> {
        return new Promise(async (resolve, reject)=>{
            try {
                const userFound = await UserModel.findOne({email: user.email});
    
                if(userFound) throw new Error('Email already in use.');
    
                const newUser = await UserModel.create(user);
                
                await newUser.save();
    
                resolve(newUser);
            } catch (error) {
                reject(error);
            }
        });
    },
    read(username: string): Promise<IUser | void | null> {
        return new Promise(async (resolve, reject)=>{
            const user = await UserModel.findOne({ user: username}).catch( e =>{
                return reject('An error has occurried finding the user')
            });
            //if(!user) return reject('User not found.');
            return resolve(user);
        })
    },
    update(id: string, data: Object): Promise<boolean> {
        return new Promise(async (resolve, reject)=>{
            await UserModel.updateOne({_id: id}, data).catch( e =>{ reject(false)});

            resolve(true);
        })
    },
    delete(id: string): Promise<boolean> {
        return new Promise(async (resolve, reject)=>{
            await UserModel.deleteOne({_id: id}).catch( e=>{ reject('Error deleting user.'); });

            resolve(true);
        });
    },
    getByEmail(email: string): Promise<IUser | void | null> {
        return new Promise(async (resolve, reject) =>{
        
            const user = await UserModel.findOne({ email }).catch( e =>{
                reject('Error executing query.');
            });

            return resolve(user);
        });
    }}
}