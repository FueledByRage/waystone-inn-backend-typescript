import { DTOGetPosts } from "../../../entities/DTOs/DTOGetPosts";
import { DTOSub } from "../../../entities/DTOs/DTOSub";
import { iCommunity } from "../../../entities/ICommunity";
import { IPost } from "../../../entities/IPosts";
import { ICommunityRepository } from "../../../repositories/ICommunityRepository";
import { IPostRepository, IReadPost } from "../../../repositories/IPostsRepository";
import { ISubRepository } from "../../../repositories/ISubRepository";
import { ICryptography } from "../../../services/cryptography/ICryptography";
import { decriptToken } from "../../../utils/cryptography";
import { errorFactory } from "../../../utils/errorFactory";

export interface ICommunityAndPosts{
    community: void | iCommunity | null,
    posts: void | IPost[],
    lastPage: boolean | void ,
    sub: boolean 
}

export interface IFindCommunityPost{
    execute(data : DTOGetPosts, token : string):  Promise<ICommunityAndPosts>;
}

export function find(CommunityRepository: ICommunityRepository, PostRepository : IPostRepository, subRepository : ISubRepository, cryptography : ICryptography){

    return{
        execute: ( data : DTOGetPosts, token : string) : Promise<ICommunityAndPosts> =>{
            return new Promise(async (resolve, reject)=>{
                try {
    
                    const community = CommunityRepository.read(data.id)
                    const skip = (data.page - 1) * data.register;
                    const postsResult = PostRepository.readPosts(data.id, skip, data.register)
                    const result = await Promise.all(
                        [
                            community,
                            postsResult
                        ]
                    );
                    
                    const lastPage = result[1]?.count - (skip + data.register) <=0;

                    const userId = await cryptography.decript(token);

                    const dataSub = new DTOSub(userId, data.id, false);
                    
                    let sub = true;    

                    await subRepository.read(dataSub).catch(error =>{
                        sub = false;
                    })
                    
                    const communityAndPosts = {
                        community: result[0] ,
                        posts: result[1].posts,
                        lastPage: lastPage,
                        sub
                    }
                    resolve(communityAndPosts);
                    
                } catch (error) {
                    reject(error);
                }

            });
        }
    }
}