import { ICommunityAndPosts } from "../cases/community/FindWithPosts/find";
import { Community } from "../entities/Community";
import { DTOCommunity } from "../entities/DTOs/DTOCommunity";
import { DTOGetPosts } from "../entities/DTOs/DTOGetPosts";
import { iCommunity } from "../entities/Abstractions/ICommunity";

export interface ICommunityRepository{    
    create(data : DTOCommunity): Promise<iCommunity>
    read(id: string): Promise<iCommunity | void | null >
    getCommunitiesById(id: string): Promise<Array<iCommunity>>
    getCommunitiesByName(name: string): Promise<Array<iCommunity>>
    getCommunityAndPosts(data : DTOGetPosts): Promise<ICommunityAndPosts>
    update(id: string, data: Object): Promise<iCommunity>
    delete(id: string): Promise<boolean>
    sub(userId: string, communityId : string): Promise<void>
    unsub(userId: string, communityId : string): Promise<void>
}