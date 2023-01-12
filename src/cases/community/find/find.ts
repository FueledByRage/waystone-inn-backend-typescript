import { ICommunityRepository } from "../../../repositories/ICommunityRepository";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";
import { IFindCommunityOutput } from "./controller";
import { ISubRepository } from "../../../repositories/ISubRepository";
import { DTOSub } from "../../../entities/DTOs/DTOSub";
import { ICryptography } from "../../../services/cryptography/ICryptography";

export function find(communityRepository: ICommunityRepository, subRepository : ISubRepository, cryptography : ICryptography){
    return{
        execute:(id: string, userId : string ) : Promise<IFindCommunityOutput> =>{
            return new Promise( async (resolve, reject)=>{
                try {
                    const community = await communityRepository.read(id);
                    
                    
                    if(!userId || userId == '') resolve({ community, sub : false });

                    userId = await cryptography.decript(userId);
            
                    const subData = new DTOSub(userId, id, false);


                    await subRepository.read(subData).catch(e =>{
                        return resolve({ community,  sub: false});
                    })


                    resolve({ community,  sub: true});
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
}