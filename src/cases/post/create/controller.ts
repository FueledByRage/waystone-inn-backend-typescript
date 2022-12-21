import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";
import { ICreatePost } from "./create";
import { decriptToken } from "../../../utils/cryptography";
import { DTOPost } from "../../../entities/DTOs/DTOPost";


export function CreatePostController(createPost: ICreatePost){

    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            try {
                const { token } = req.headers;
                const { title, body, id } = req.body;
    
                if(!title || !body || !id || !token) throw errorFactory('Missing param.', 406);
                
                //@ts-ignore
                const userId = await decriptToken(token)
                .catch((error: Error) =>{
                    throw errorFactory('Error decripting token', 406);
                });

                const data = new DTOPost(userId, id, title, body);

                const post = await createPost.execute(data);

                res.status(201).json(post);
                
            } catch (error) {
                cb(error);
            }
        }
    }
}