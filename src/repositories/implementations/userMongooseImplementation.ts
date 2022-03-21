import { Model } from "mongoose";
import { UserModel,IUserSchema } from "../../models/user";
import { IUserRepository } from "../IUserRepository";
import { IUser } from "../../entities/IUser";
import { User } from "../../entities/user";
import { errorFactory } from "../../utils/errorFactory";

export function UserMongoose(): IUserRepository{
    return{
    create(user: User): Promise<IUser> {
        return new Promise(async (resolve, reject)=>{

            const userFound = await UserModel.findOne({email: user.email}).catch(console.error)

            if(userFound) reject(new Error('Email already in use.'));

            const newUser = await UserModel.create(user).catch((e: Error) =>{
                reject(e);
            });
            if(!newUser) reject(new Error('Error saving user'));
            
            //@ts-ignore
            await newUser.save().catch((e: Error)=>{
                reject(errorFactory('Error saving user.'))
            });
            //@ts-ignore
            resolve(newUser);
        });

    },
    read(id: string): Promise<IUser> {
        return new Promise(async (resolve, reject)=>{
            const user = await UserModel.findById(id).catch( e =>{})
            if(!user) return reject('User not found.');
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
    getByEmail(email: string): Promise<IUser> {
        return new Promise(async (resolve, reject) =>{
        
            const user = await UserModel.findOne({ email }).catch( e =>{
                reject('Error executing query.');
            });

            if(!user) return reject('User not found.');

            return resolve(user);
        });
    }}
}
/*
export class UserMongoose implements IUserRepository{
    create(user: User): Promise<IUser> {
        return new Promise(async (resolve, reject)=>{

            const userFound = await UserModel.findOne({email: user.email}).catch(console.error)

            if(userFound) reject(new Error('Email already in use.'));

            const newUser = await UserModel.create(user).catch((e: Error) =>{
                reject(e);
            });
            if(!newUser) reject(new Error('Error saving user'));
            
            //@ts-ignore
            await newUser.save().catch((e: Error)=>{
                reject(errorFactory('Error saving user.'))
            });
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
    getByEmail(email: string): Promise<IUser> {
        return new Promise(async (resolve, reject) =>{
        
            const user = await UserModel.findOne({ email }).catch( e =>{
                reject('Error executing query.');
            });

            if(!user) return reject('User not found.');

            return resolve(user);
        });
    }

}*/