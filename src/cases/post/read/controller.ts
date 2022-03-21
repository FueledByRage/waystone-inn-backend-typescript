import { IReadPosts } from "./get";
import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";

export function readPostsController(readPosts: IReadPosts){
    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            try {
                const { id, page, registers } = req.params;
                const { token } = req.headers;
                
                
                const response = await readPosts.execute(id, parseInt(page), parseInt(registers))
                .catch((error: Error) =>{
                    const createdError = errorFactory('Error reaching posts', 500);
                    throw createdError;
                });

                if(!token) return res.json(response);

                //@ts-ignore
                const userId = await decriptToken(token).catch((error: Error) =>{
                    const createdError = errorFactory(error.message, 406);
                    throw createdError;
                });

                response.posts.forEach((post) =>{
                    post.liked = post.listOfUsersWhoLikedIt?.includes(userId);
                    post.disliked = post.listOfUsersWhoDislikedIt?.includes(userId);
                    Reflect.deleteProperty(post, 'listOfUsersWhoLikedIt');
                    Reflect.deleteProperty(post, 'listOfUsersWhoDislikedIt');
                });

                res.json(response);
            } catch (error) {
                cb(error);
            }
        }
    }
}