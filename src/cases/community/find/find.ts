import { ICommunity } from "../../../repositories/ICommunityRepository";

export function find(communityRepository: ICommunity){
    return{
        execute:(id: string)=>{
            return new Promise( async (resolve, reject)=>{
                const community = await communityRepository.read(id).catch( e =>{ reject(new Error('Error finding community.')) });

                resolve(community);
            });
        }
    }
}