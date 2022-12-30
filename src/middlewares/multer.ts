import multer from "multer";
import * as path from "path";
import mime from "mime-types";
import { errorFactory } from "../utils/errorFactory";
import { Request } from "express-serve-static-core";
import * as dotenv from 'dotenv';

dotenv.config();

const uploadImagePosts : string = path.resolve( __dirname, "..", ".." , "uploads", "img", "posts");
const uploadImageProfile : string = path.resolve( __dirname, "..", "uploads", "img", "profile");

const localStorage = multer.diskStorage({
    destination: function (req, file, cb){
        const uploadOptions : { [ key : string ] : ()=> void} = {
            '/user/edit':() => cb(null, uploadImageProfile),
            '/user/register': () => cb(null, uploadImageProfile),
            '/post/register':() => cb(null, uploadImagePosts)
        }
        const selectedOption = uploadOptions[req.url];
        
        selectedOption();
    },
    filename: function (req, file, cb){
        const type = mime.extension(file.mimetype);
        cb(null, `${new Date().getTime()}.${type}`);        
    }
});


const imageFilter = ()=>{
    return (req : Request, file : Express.Multer.File, cb : multer.FileFilterCallback)=>{
        console.log('here');
        const type = mime.extension(file.mimetype);

        const conditions = ["png", "jpg", "jpeg"];

        if (conditions.includes(`${type}`)) cb(null, true);
    
        cb(null, false);
    }
}

const imageMulterConfig = {
    storage: localStorage,
    fileFilter : imageFilter(),
}

export const uploads = multer(imageMulterConfig);