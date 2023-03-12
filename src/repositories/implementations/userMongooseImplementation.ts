import { Model } from "mongoose";
import { UserModel,IUserSchema } from "../../models/user";
import { IUserRepository } from "../IUserRepository";
import { User } from "../../entities/user";
import { errorFactory } from "../../utils/errorFactory";
import { DTOUser } from "../../entities/DTOs/DTOUser";
import { DTOUpdateUser } from "../../entities/DTOs/DTOUpdateUser";
import { IUser } from "../../entities/Abstractions/IUser";

export function UserMongoose(): IUserRepository{
    return{
    create(data: DTOUser): Promise< IUser > {
        return new Promise(async (resolve, reject)=>{
            try {
                const newUser = await (await UserModel.create(data)).save();
                
                //const user = new User(newUser);
                
                if(newUser)resolve(newUser);
            
                throw errorFactory('Error saving user');
            } catch (error) {
                reject(error);
            }
        });
    },
    read(username: string): Promise<IUser | void | null> {
        return new Promise(async (resolve, reject)=>{
            try {
                const user = await UserModel.findOne({ user: username}).select('-password');

                if(!user) return resolve(null);

    
                return resolve(user);

            } catch (error) {
                reject(error);
            }
        })
    },
    update( data : DTOUpdateUser ): Promise<boolean> {
        return new Promise(async (resolve, reject)=>{
            try {
                const updated = await UserModel.updateOne({_id: data.userId}, data);
                
                return resolve(updated.modifiedCount > 0 );
            } catch (error) {
                console.error(error);
                reject(error);
            }
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

            if(!user) return resolve(user);

            //const foundUser = new User(user);
            return resolve(user);
        });
    },
    findById( id : string ) : Promise<IUser>{
        return new Promise( async (resolve, reject )=>{
            const user = await UserModel.findById(id).catch(error =>{
                reject(new Error('Error executing search'));
            });

            if(!user) return reject(errorFactory('User not found', 404));

            //const foundUser = new User(user);
            
            return resolve(user);
        })
    }}
}