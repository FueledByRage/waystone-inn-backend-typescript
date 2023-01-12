import { DTOPost } from "../../../entities/DTOs/DTOPost";
import { DTOSub } from "../../../entities/DTOs/DTOSub";
import { Post } from "../../../entities/Post";
import { IPostRepository } from "../../../repositories/IPostsRepository";
import { ISubRepository } from "../../../repositories/ISubRepository";
import { errorFactory } from "../../../utils/errorFactory";


export interface ICreatePost {
    execute(data : DTOPost) : Promise<Post>;
}


export function CreatePost(repository: IPostRepository, subRepository : ISubRepository ) : ICreatePost{
    return{
        execute(data : DTOPost) :Promise<Post>{
            return new Promise( async (resolve, reject) =>{
                try {

                    const dataSub = new DTOSub(data.authorId, data.communityId, false);

                    const isSub = await subRepository.read(dataSub);

                    if(!isSub) throw errorFactory('Error finding your community register', 406);

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