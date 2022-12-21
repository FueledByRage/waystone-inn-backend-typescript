import { DTOGetPosts } from "../../../entities/DTOs/DTOGetPosts";
import { iCommunity } from "../../../entities/ICommunity";
import { IPost } from "../../../entities/IPosts";
import { ICommunityRepository } from "../../../repositories/ICommunityRepository";
import { IPostRepository, IReadPost } from "../../../repositories/IPostsRepository";
import { decriptToken } from "../../../utils/cryptography";
import { errorFactory } from "../../../utils/errorFactory";

export interface ICommunityAndPosts{
    community: void | iCommunity | null,
    posts: void | IPost[],
    lastPage: boolean | void ,
    sub: boolean 
}

export interface IFindCommunityPost{
    execute(data : DTOGetPosts, token : string | string[]):  Promise<ICommunityAndPosts>;
}

export function find(CommunityRepository: ICommunityRepository, PostRepository : IPostRepository){

    return{
        execute: ( data : DTOGetPosts, token : string | string[]) : Promise<ICommunityAndPosts> =>{
            return new Promise(async (resolve, reject)=>{
                const community = CommunityRepository.read(data.id)
                const skip = (data.page - 1) * data.register;
                const postsResult = PostRepository.readPosts(data.id, skip, data.register)
                const result = await Promise.all(
                    [
                        community,
                        postsResult
                    ]
                ).catch(error =>{ reject('Error reaching data.') })
                
                //@ts-ignore
                const userId = await decriptToken(token).catch((error: Error) =>{
                    const createdError = errorFactory('Error validating token.', 406);
                    reject(createdError);
                });

                const sub = result && result[0]?.members?.includes(userId || '');

                const lastPage = result && result[1]?.count - (skip + data.register) <=0;

                const communityAndPosts = {
                    community: result && result[0] ,
                    posts: result ? result[1].posts : [],
                    lastPage: lastPage || false,
                    sub: sub || false
                }
                resolve(communityAndPosts);
            });
        }
    }
}