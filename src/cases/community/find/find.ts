import { ICommunityRepository } from "../../../repositories/ICommunityRepository";

export function find(communityRepository: ICommunityRepository){
    return{
        execute:(id: string)=>{
            return new Promise( async (resolve, reject)=>{
                const community = await communityRepository.read(id)
                .catch( e =>{ reject(new Error('Error finding community.')) });

                resolve(community);
            });
        }
    }
}