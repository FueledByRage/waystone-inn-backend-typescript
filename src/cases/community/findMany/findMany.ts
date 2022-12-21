import { iCommunity } from "../../../entities/ICommunity";
import { ICommunityRepository } from "../../../repositories/ICommunityRepository";
import { errorFactory } from "../../../utils/errorFactory";

export interface IFindManyCommunity{
    execute(id: string): Promise<Array<iCommunity> | void | null >
}

export function FindMany(repository: ICommunityRepository) : IFindManyCommunity{
    return{
        execute(id: string) : Promise<Array<iCommunity> | void | null>{
            return new Promise( async (resolve, reject)=>{
                const communities = await repository.getCommunitiesById(id)
                .catch((error: Error) => {
                    reject(error);
                });

                resolve(communities);
            });
        }
    }
}