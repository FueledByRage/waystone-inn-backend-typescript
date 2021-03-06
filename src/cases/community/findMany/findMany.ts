import { iCommunity } from "../../../entities/ICommunity";
import { ICommunityRepository } from "../../../repositories/ICommunityRepository";
import { errorFactory } from "../../../utils/errorFactory";

export interface IFindManyCommunity{
    execute(id: string): Promise<Array<iCommunity>>
}

export function FindMany(repository: ICommunityRepository) : IFindManyCommunity{
    return{
        execute(id: string) : Promise<Array<iCommunity>>{
            return new Promise( async (resolve, reject)=>{
                const communities = await repository.getCommunitiesById(id)
                .catch((error: Error) => {
                    reject(error);
                });
                //@ts-ignore
                resolve(communities);
            });
        }
    }
}