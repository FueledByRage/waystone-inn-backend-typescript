import { IPost } from "../../entities/IPosts";
import { Post } from "../../entities/Post";
import { PostModel } from "../../models/post";
import { UserModel } from "../../models/user";
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

                const posts = await PostModel.find({ communityId: id })
                .select('+listOfUsersWhoLikedIt +listOfUsersWhoDislikedIt')
                .skip(skip).limit(registers)
                .catch((error: Error) =>{ reject(new Error(`Error: ${error.message}`)) });

                //@ts-ignore
                resolve({ posts: posts, count: count });  
            });
        },
        getPostsFeed(id: string, skip: number, registers: number) : Promise<IReadPost> {
            return new Promise(async (resolve, reject) =>{
                const userFound = await UserModel.findById(id).select('+subs');
                
                //@ts-ignore
                const count = await PostModel.find({ communityId: userFound.subs}).countDocuments();
                
                //@ts-ignore
                const posts = await PostModel.find({ communityId: userFound.subs })
                .select('+listOfUsersWhoLikedIt +listOfUsersWhoDislikedIt')
                .skip(skip).limit(registers)
                .catch((error: Error) =>{ reject(new Error(`Error: ${error.message}`)) });
                
                //@ts-ignore
                resolve({ posts: posts, count: count });  
            });
        },
        read(id: string) : Promise<IPost>{
            return new Promise(async (resolve, reject) =>{
                const post = await PostModel.findById(id)
                .select('+listOfUsersWhoLikedIt +listOfUsersWhoDislikedIt').catch((error: Error)=>{
                    const createdError = errorFactory('Could not execute search on database.', 500);
                    reject(createdError);
                });

                if(!post) reject(new Error('Post not found'));
                
                //@ts-ignore
                resolve(post);
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