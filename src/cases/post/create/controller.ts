import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";
import { ICreatePost } from "./create";
import { decriptToken } from "../../../utils/cryptography";
import { DTOPost } from "../../../entities/DTOs/DTOPost";
import fs from 'fs';
import { resolve } from "path";

export function CreatePostController(createPost: ICreatePost){

    return{
        async execute(req: Request, res: Response, cb: NextFunction){
            try {
                const { title, body, id } = req.body;
                const { token } = req.headers;
                const key = req.file?.filename;

                if(!title || !body || !id || !token) throw errorFactory('Missing param.', 406);
                
                //@ts-ignore
                const userId = await decriptToken(token)
                .catch((error: Error) =>{
                    throw errorFactory('Error decripting token', 406);
                });

                const data = new DTOPost(userId, id, title, body, key);

                const post = await createPost.execute(data);

                res.status(201).json(post);
                
            } catch (error) {
                const key = req.file?.filename;

                if(key) {
                    const filePath = resolve(__dirname, '..', '..', '..', '..', 'uploads', 'img', 'posts', key)
                    fs.unlink(filePath, error => console.error(error));
                }
                cb(error);
            }
        }
    }
}