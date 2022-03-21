import { iCommunity } from "../../../entities/ICommunity"
import { ICommunityRepository } from "../../../repositories/ICommunityRepository";

export interface IFindByName {
    execute(name: string) : Promise<Array<iCommunity>>
}

export function findCommunityByName(repository : ICommunityRepository) : IFindByName {

    return{
        execute: (name: string) : Promise<Array<iCommunity>> =>{
            return new Promise( async (resolve, reject)=>{
                const response = await repository.getCommunitiesByName(name)
                .catch((error: Error) =>{
                    reject(error);
                });

                //@ts-ignore
                resolve(response);
            });
        }
    }
}