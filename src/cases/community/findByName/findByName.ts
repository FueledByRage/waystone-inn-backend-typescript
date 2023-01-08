import { iCommunity } from "../../../entities/ICommunity"
import { ICommunityRepository } from "../../../repositories/ICommunityRepository";

export interface IFindByName {
    execute(name: string) : Promise<Array<iCommunity>>
}

export function findCommunityByName(repository : ICommunityRepository) : IFindByName {

    return{
        execute: (name: string) : Promise<Array<iCommunity>> =>{
            return new Promise( async (resolve, reject)=>{
                try {
                    const response = await repository.getCommunitiesByName(name);
    
                    resolve(response);
                    
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
}