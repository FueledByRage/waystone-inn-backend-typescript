import { iCommunity } from "../../../entities/ICommunity";
import { ICommunityRepository } from "../../../repositories/ICommunityRepository";

interface CommunityAndPosts{
    Community: iCommunity,
    docs: Array<String>,
    lastPage: boolean,
    sub: boolean

}

export interface IFindCommunityPost{
    execute(id: string, page: number, registers: number):  Promise<Boolean>;
}

export function find(CommunityRepository: ICommunityRepository){

    return{
        execute: (id: string, page: number, registers: number)=>{
            return new Promise((resolve, reject)=>{

            });
        }
    }
}