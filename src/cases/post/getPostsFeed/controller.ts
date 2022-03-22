import { IGetPostsFeed } from "./get";
import { NextFunction, Request, Response } from "express";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";

export function getPostsFeedController(getPostsFeed: IGetPostsFeed){
    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            try {
                const { page, registers } = req.params;
                const { token } = req.headers;

                if(!token) throw errorFactory('Missing authorization token.', 406);
                
                 //@ts-ignore
                const userId = await decriptToken(token).catch((error: Error) =>{
                    const createdError = errorFactory(error.message, 406);
                    throw createdError;
                });

                let response = await getPostsFeed.execute(userId, parseInt(page), parseInt(registers))
                .catch((error: Error) =>{
                    const createdError = errorFactory('Error reaching posts', 500);
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