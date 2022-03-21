import { IPost } from "../../entities/IPosts";
import { Post } from "../../entities/Post";
import { PostModel } from "../../models/post";
import { errorFactory } from "../../utils/errorFactory";
import { IPostRepository } from "../IPostsRepository";
import { IReadPost } from "../IPostsRepository";

export function MongoosePost(): IPostRepository{
    return{
        create(post: Post){
            return new Promise(async (resolve, reject)=>{
                const createdPost = await PostModel.create(post).catch((error: Error)=>{
                    const createdError = errorFactory('Error creating post - Failed to execute', 500);
                    reject(createdError);
                });
                if(!createdPost) reject(errorFactory('Error creating post.', 500));
                
                //@ts-ignore
                resolve(createdPost);
            });
        },
        readPosts(id: string, skip: number, registers: number) : Promise<IReadPost> {
            return new Promise(async (resolve, reject) =>{
                
                const count = await PostModel.find({ communityId: id}).countDocuments();

                const posts = await PostModel.find({ communityId: id }).skip(skip).limit(registers)
                .catch((error: Error) =>{ reject(new Error(`Error: ${error.message}`)) });

                //@ts-ignore
                resolve({ posts: posts, count: count });  
            });
        }
    }
}