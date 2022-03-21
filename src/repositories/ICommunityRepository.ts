import { Community } from "../entities/Community";
import { iCommunity } from "../entities/ICommunity";

export interface ICommunityRepository{    
    create(name: string, description: string, userId: string): Promise<iCommunity>
    read(id: string): Promise<Community>
    getCommunitiesById(id: string): Promise<Array<Community>>
    getCommunitiesByName(name: string): Promise<Array<iCommunity>>
    getCommunityAndPosts(id: string, page: number): Promise<Array<{ community:Community }>>
    update(id: string, data: Object): Promise<Community>
    delete(id: string): Promise<boolean>
    sub(userId: string, communityId : string): Promise<void>
    unsub(userId: string, communityId : string): Promise<void>
}