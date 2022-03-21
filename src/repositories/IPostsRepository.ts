import { IPost } from "../entities/IPosts";
import { Post } from "../entities/Post";

export interface IPostRepository{
    create(post: Post): Promise<IPost>;
}