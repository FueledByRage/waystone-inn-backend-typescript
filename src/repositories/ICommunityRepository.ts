import { Community } from "../entities/Community";
import { iCommunity } from "../entities/ICommunity";

export interface ICommunityRepository{    
    create(name: string, description: string, userId: string): Promise<iCommunity>
    read(id: string): Promise<Community>
    getCommunitiesByToken(token: string): Promise<Array<Community>>
    getCommunitiesByName(name: string): Promise<Array<Community>>
    getCommunityAndPosts(id: string, page: number): Promise<Array<{ community:Community }>>
    update(id: string, data: Object): Promise<Community>
    delete(id: string): Promise<boolean>

}