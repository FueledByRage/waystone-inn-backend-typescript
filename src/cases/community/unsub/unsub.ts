import { ICommunityRepository } from "../../../repositories/ICommunityRepository";

export interface IUnsubCommunity{
    execute(userId: string, communityId: string) : Promise<void>
}

export function unsub( communityRepository: ICommunityRepository) : IUnsubCommunity {

    return{
        execute(userId: string, communityId: string) : Promise<void>{
            return new Promise( async (resolve, reject)=>{

                await communityRepository.unsub(userId, communityId)
                .catch((error: Error)=>{
                    reject(error);
                });

                resolve();
            });
        }
    }

}