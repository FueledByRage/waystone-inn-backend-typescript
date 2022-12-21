import { DTOCommunity } from "../../../entities/DTOs/DTOCommunity";
import { iCommunity } from "../../../entities/ICommunity";
import { ICommunityRepository } from "../../../repositories/ICommunityRepository";

export function create(communityRepository: ICommunityRepository){
    
    return{
        execute: (data : DTOCommunity) : Promise<iCommunity | void | null> => {
            return new Promise( async (resolve, reject)=>{
                const newCommunity = await communityRepository.create(data).catch(e =>{ reject(e); })
                resolve(newCommunity);
            })

        }
    }
}