import { Model } from "mongoose";
import { UserModel,IUserSchema } from "../../models/user";
import { IUserRepository } from "../IUserRepository";
import { IUser } from "../../entities/IUser";
import { User } from "../../entities/user";
import { errorFactory } from "../../utils/errorFactory";
import { DTOUser } from "../../entities/DTOs/DTOUser";

export function UserMongoose(): IUserRepository{
    return{
    create(data: DTOUser): Promise< User > {
        return new Promise(async (resolve, reject)=>{
            try {
                const newUser = await (await UserModel.create(data)).save();
                
                const user = new User(data, newUser._id);
                
                if(user)resolve(user);
            
                throw errorFactory('Error saving user');
            } catch (error) {
                reject(error);
            }
        });
    },
    read(username: string): Promise<User | void | null> {
        return new Promise(async (resolve, reject)=>{
            const user = await UserModel.findOne({ user: username}).select("-password")
            .catch( e =>{
                return reject('An error has occurried finding the user')
            });
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
    getByEmail(email: string): Promise<User | void | null> {
        return new Promise(async (resolve, reject) =>{
        
            const user = await UserModel.findOne({ email }).catch( e =>{
                reject('Error executing query.');
            });
            return resolve(user);
        });
    },
    findById( id : string ) : Promise<User>{
        return new Promise( async (resolve, reject )=>{
            const user = await UserModel.findById(id).catch(error =>{
                reject(new Error('Error executing search'));
            });
            
            user && resolve(user);
            reject(errorFactory('Error finding user', 404));
        })
    }}
}