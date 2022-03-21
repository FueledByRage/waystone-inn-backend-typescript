import { ICommunityRepository } from "../../../repositories/ICommunityRepository";

export interface ISubCommunity{
    execute(userId: string, communityId: string) : Promise<void>
}

export function sub( communityRepository: ICommunityRepository) : ISubCommunity {

    return{
        execute(userId: string, communityId: string) : Promise<void>{
            return new Promise( async (resolve, reject)=>{

                await communityRepository.sub(userId, communityId)
                .catch((error: Error)=>{
                    reject(error);
                });

                resolve();
            });
        }
    }

}