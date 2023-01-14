import { DTOPost } from "../../../entities/DTOs/DTOPost";
import { DTOSub } from "../../../entities/DTOs/DTOSub";
import { Post } from "../../../entities/Post";
import { IPostRepository } from "../../../repositories/IPostsRepository";
import { ISubRepository } from "../../../repositories/ISubRepository";
import { errorFactory } from "../../../utils/errorFactory";
import * as dotenv from 'dotenv';
import { IPost } from "../../../entities/Abstractions/IPosts";
dotenv.config();


export interface ICreatePost {
    execute(data : DTOPost) : Promise<IPost>;
}


export function CreatePost(repository: IPostRepository, subRepository : ISubRepository ) : ICreatePost{
    return{
        execute(data : DTOPost) :Promise<IPost>{
            return new Promise( async (resolve, reject) =>{
                try {

                    data.url = data.filename ? `${process.env.UPLOAD_URL}img/posts/${data.filename}` : '';

                    const dataSub = new DTOSub(data.authorId, data.communityId, false);

                    const isSub = await subRepository.read(dataSub);

                    if(!isSub) throw errorFactory('You must be a member to post make a post', 406);

                    const newPost = await repository.create(data);
                    
                    if(newPost) return resolve(newPost);
                    throw new Error( 'Error saving post');
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
}