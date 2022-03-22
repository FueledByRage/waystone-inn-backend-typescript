import { IReadPost } from "./get";
import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";

export function readPostController(readPosts: IReadPost){
    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            try {
                const { id } = req.params;
                const { token } = req.headers;
            
                const post = await readPosts.execute(id)
                .catch((error: Error) =>{
                    const createdError = errorFactory('Error reaching post', 404);
                    throw createdError;
                });

                Reflect.deleteProperty(post, 'listOfUsersWhoLikedIt');
                Reflect.deleteProperty(post, 'listOfUsersWhoDislikedIt');

                if(!token) return res.json(post);

                //@ts-ignore
                const userId = await decriptToken(token).catch((error: Error) =>{
                    const createdError = errorFactory(error.message, 406);
                    throw createdError;
                });

                post.liked = post.listOfUsersWhoLikedIt?.includes(userId);
                post.disliked = post.listOfUsersWhoDislikedIt?.includes(userId);
                Reflect.deleteProperty(post, 'listOfUsersWhoLikedIt');
                Reflect.deleteProperty(post, 'listOfUsersWhoDislikedIt');

                res.json(post);
            } catch (error) {
                cb(error);
            }
        }
    }
}