import { DTOPost } from "../../entities/DTOs/DTOPost";
import { IPost } from "../../entities/IPosts";
import { Post } from "../../entities/Post";
import { PostModel } from "../../models/post";
import { UserModel } from "../../models/user";
import { errorFactory } from "../../utils/errorFactory";
import { IPostRepository } from "../IPostsRepository";
import { IReadPost } from "../IPostsRepository";

export function MongoosePost(): IPostRepository{
    return{
        create(data: DTOPost){
            return new Promise(async (resolve, reject)=>{
                const post = new Post(data);
                const createdPost = await (await PostModel.create(post)).save().catch((error: Error)=>{
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
                
                const posts = await PostModel.find({ communityId: id })
                .skip(skip).limit(registers)
                .catch((error: Error) =>{ reject(new Error(`Error: ${error.message}`)) });

                //@ts-ignore
                resolve({ posts: posts, count: count });  
            });
        },
        getPostsFeed(skip: number, registers: number, subs : string[]) : Promise<IReadPost> {
            return new Promise(async (resolve, reject) =>{

                try {
                    const count = await PostModel.find({ communityId: subs}).countDocuments();
                    
                    const posts = await PostModel.find({ communityId: subs })
                    .skip(skip)
                    .limit(registers)
                    .populate('communityId')
                    .populate('authorId');
                    
                    if(posts ) return resolve({ posts, count });  
                    throw new Error('Error reaching data');
                    
                } catch (error) {
                    console.error(error);
                    reject(error);
                }

            });
        },
        read(id: string) : Promise<IPost>{
            return new Promise(async (resolve, reject) =>{
                const post = await PostModel.findById(id)
                .catch((error: Error)=>{
                    const createdError = errorFactory('Could not execute search on database.', 500);
                    reject(createdError);
                });

                post && resolve(post);
                reject(errorFactory('Post not found', 404));
            });
        },
        delete(id: string, userId: string) : Promise<void>{
            return new Promise(async (resolve, reject) =>{
                const deletePost = await PostModel.deleteOne({ _id: id, authorId: userId })
                .catch((error: Error)=>{
                    const createdError = errorFactory('Error executing database request.', 500);
                    reject(createdError);
                });
                
                //@ts-ignore
                if(deletePost.deletedCount < 1) reject(new Error('Error deleting post.'));

                resolve();
            });
        }

    }
}