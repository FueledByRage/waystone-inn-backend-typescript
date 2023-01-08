import { Community } from "../../entities/Community";
import { CommunityModel } from "../../models/community";
import { errorFactory } from "../../utils/errorFactory";
import { UserModel } from "../../models/user";
import { iCommunity } from "../../entities/ICommunity";
import { ICommunityRepository } from "../ICommunityRepository";
import { findIndex } from "./implementatiosUtils";
import { DTOCommunity } from "../../entities/DTOs/DTOCommunity";
import { DTOGetPosts } from "../../entities/DTOs/DTOGetPosts";
import { ICommunityAndPosts } from "../../cases/community/FindWithPosts/find";

export function MongooseCommunity() : ICommunityRepository {
    return{
        create(data : DTOCommunity): Promise<iCommunity> {
            return new Promise(async (resolve, reject)=>{
                try {
                    const userFound = await UserModel.findById(data.authorId);
                    if(!userFound) throw errorFactory('User not found.', 406);
        
                    const community = new Community(data);
    
                    const newCommunity = await ( await CommunityModel.create(community)).save();
                    
                    newCommunity && await userFound.updateOne({$pull:{ subs: newCommunity._id }});
                    resolve(newCommunity);
                    
                } catch (error) {
                    reject(error);
                }
            });
        },
        read(id: string): Promise<iCommunity | void | null> {
            return new Promise( async (resolve, reject)=>{
                const community = await CommunityModel.findById(id).catch((e: Error) =>{
                    reject(errorFactory('Error reading database'));
                });

                if(!community) reject(errorFactory('Community not found.', 404));
    
                resolve(community);
            });
        },
        getCommunitiesByName(name: string): Promise<iCommunity[]> {
            return new Promise(async (resolve, reject)=>{
                const communities = await CommunityModel.find({name: {'$regex': name, '$options': 'i'}}).
                catch((error: Error)=>{
                   const createdError = errorFactory('Error executing search');
                   reject(createdError); 
                });

                //@ts-ignore
                resolve(communities);
            });
        },
        getCommunitiesById(id: string): Promise<iCommunity[]> {
            return new Promise( async (resolve, reject)=>{
                try {
                    const user = await UserModel.findById(id);

                    if(!user) throw errorFactory('User not found');
    
                    const communities = await CommunityModel.find( { '_id': {$in: user?._id} }).limit(3);

                    resolve(communities);
    
                } catch (error) {
                    reject(errorFactory('Error executing query.'));
                }
            });
        },
        getCommunityAndPosts(data : DTOGetPosts): Promise<ICommunityAndPosts> {
            return new Promise((resolve, reject)=>{

            });
            
        },
        update(id: string, data: Object): Promise<Community> {
            return new Promise((resolve, reject)=>{});
        },
        delete(id: string): Promise<boolean> {
            return new Promise((resolve, reject)=>{});
        },
        sub(userId: string, communityId: string): Promise<void>{
            return new Promise( async (resolve, reject)=>{
                const user = await UserModel.findById(userId).select('+subs');
                const community = await CommunityModel.findById(communityId).select('+members');

                if(!user || !community) reject(errorFactory('Error finding community/user.', 404));

                if(!community?.members.includes(userId)){
                    await community?.updateOne({$push: { members: userId }});
                    await user?.updateOne({$push: { subs: communityId }});
                }
                resolve();
            });
        },
        unsub(userId: string, communityId: string): Promise<void>{
            return new Promise( async (resolve, reject)=>{
                const user = await UserModel.findById(userId).select('+subs');
                const community = await CommunityModel.findById(communityId).select('+members');

                if(!user || !community) reject(errorFactory('Error finding community/user.', 404));

                if(community?.members.includes(userId)){
                    await community?.updateOne({ $pull:{ 'members': userId }});
                    await user?.updateOne({ $pull:{'subs': communityId} });
                }
                resolve();
            });
        }
        
    }
}