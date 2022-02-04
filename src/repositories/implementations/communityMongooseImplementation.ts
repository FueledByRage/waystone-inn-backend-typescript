import { Community } from "../../entities/Community";
import { CommunityModel } from "../../models/community";
import { errorFactory } from "../../utils/errorFactory";
import { UserModel } from "../../models/user";
import { iCommunity } from "../../entities/ICommunity";
import { ICommunityRepository } from "../ICommunityRepository";


export class MongooseCommunity implements ICommunityRepository{
    create(name: string, description: string, userId: string): Promise<iCommunity> {
        return new Promise(async (resolve, reject)=>{
            const userFound = await UserModel.findById(userId);
                
            if(!userFound) throw errorFactory('User not found.', 406);


            const community = new Community(userFound._id, name, description);
            const newCommunity = await CommunityModel.create(community).catch((e: Error)=>{
                reject(errorFactory('Error creating community.'));
            });
            //@ts-ignore
            await newCommunity.save().catch((e: Error)=>{
                reject(errorFactory('Error saving community.'))
            });
            //@ts-ignore
            resolve(newCommunity);
        });
    }
    read(id: string): Promise<Community> {
        return new Promise((resolve, reject)=>{});
    }
    getCommunitiesByName(name: string): Promise<Community[]> {
        return new Promise((resolve, reject)=>{});
    }
    getCommunitiesByToken(token: string): Promise<Community[]> {
        return new Promise((resolve, reject)=>{});
    }
    getCommunityAndPosts(id: string, page: number): Promise<{ community: Community; }[]> {
        return new Promise((resolve, reject)=>{});
        
    }
    update(id: string, data: Object): Promise<Community> {
        return new Promise((resolve, reject)=>{});
    }
    delete(id: string): Promise<boolean> {
        return new Promise((resolve, reject)=>{});
    }
}