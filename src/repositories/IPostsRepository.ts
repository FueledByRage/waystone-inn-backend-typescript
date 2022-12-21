import { DTOPost } from "../entities/DTOs/DTOPost";
import { IPost } from "../entities/IPosts";
import { Post } from "../entities/Post";

export interface IReadPost {
    posts: Array<IPost>,
    count: number
}


export interface IPostRepository{
    create(data : DTOPost): Promise<IPost>;
    readPosts(id: string, page: Number, registers: number): Promise<IReadPost>;
    getPostsFeed(id: string, page: Number, registers: number): Promise<IReadPost>;
    read(id: string) : Promise<IPost>;
    delete(id: string, userId: string) : Promise<void> 
}