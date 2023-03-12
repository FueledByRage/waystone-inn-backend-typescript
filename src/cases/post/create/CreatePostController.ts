import { errorFactory } from "../../../utils/errorFactory";
import { Request, Response, NextFunction } from "express";
import { ICreatePost } from "./create";
import { DTOPost } from "../../../entities/DTOs/DTOPost";
import fs from 'fs';
import { resolve } from "path";
import { httpRequestAdapter } from "../../../adapters/httpRequestAdapter";

export const CreatePostAdaptedController = ( createPost : ICreatePost ) =>{
    return{
        async execute( req : httpRequestAdapter ){
            try {
                const { title, body, id } = req.body;
                const { userId } = req.header;
                const key = req.file?.filename;

                if(!title || !body || !id || !userId) throw errorFactory('Missing param.', 406);

                const data = new DTOPost(userId.toString() , id, title, body, key);

                const post = await createPost.execute(data);

                return post;
            } catch (error) {
                const key = req.file?.filename;

                if(key) {
                    const filePath = resolve(__dirname, '..', '..', '..', '..', 'uploads', 'img', 'posts', key)
                    fs.unlink(filePath, error => console.error(error));
                }
                return error;
            }
        } 
    }
}