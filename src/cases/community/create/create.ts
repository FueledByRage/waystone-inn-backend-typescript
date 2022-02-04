import { Community } from "../../../entities/Community";
import { ICommunityRepository } from "../../../repositories/ICommunityRepository";

export function create(communityRepository: ICommunityRepository){
    
    return{
        execute: (name: string, description: string, userId: string)=>{
            return new Promise( async (resolve, reject)=>{
                const newCommunity = await communityRepository.create(name, description, userId).catch(e =>{ reject(e); })
                resolve(newCommunity);
            })

        }
    }
}