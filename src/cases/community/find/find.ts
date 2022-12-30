import { ICommunityRepository } from "../../../repositories/ICommunityRepository";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";
import { IFindCommunityOutput } from "./controller";
import { ISubRepository } from "../../../repositories/ISubRepository";
import { DTOSub } from "../../../entities/DTOs/DTOSub";

export function find(communityRepository: ICommunityRepository, subRepository : ISubRepository){
    return{
        execute:(id: string, token : string | string[] ) : Promise<IFindCommunityOutput> =>{
            return new Promise( async (resolve, reject)=>{
                try {
                    const community = await communityRepository.read(id)
                    .catch( e =>{ 
                        reject(new Error('Error finding community.')) });
    
                    if(!token) resolve({ community, sub : false });
    
                    //@ts-ignore
                    const userId = await decriptToken(token);              
                    
                    const subData = new DTOSub(userId, id, false);
    
                    await subRepository.read(subData).catch(e =>{
                        resolve({ community,  sub: false});

                    })
                    resolve({ community,  sub: true});
                    
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
}