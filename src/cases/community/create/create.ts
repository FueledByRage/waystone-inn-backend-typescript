import { DTOCommunity } from "../../../entities/DTOs/DTOCommunity";
import { DTOSub } from "../../../entities/DTOs/DTOSub";
import { iCommunity } from "../../../entities/Abstractions/ICommunity";
import { ICommunityRepository } from "../../../repositories/ICommunityRepository";
import { ISubRepository } from "../../../repositories/ISubRepository";

export function create(communityRepository: ICommunityRepository, subRepository : ISubRepository){
    
    return{
        execute: (data : DTOCommunity) : Promise<iCommunity | void | null> => {
            return new Promise( async (resolve, reject)=>{
                try {
                    const newCommunity = await communityRepository.create(data);
                    const dataSub = new DTOSub(data.authorId, newCommunity._id, true);

                    await subRepository.create(dataSub);
                    
                    resolve(newCommunity);
                } catch (error) {
                    reject(error);
                }
            })

        }
    }
}