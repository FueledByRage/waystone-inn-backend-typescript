import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
dotenv.config();

const { SECRET_KEY } = process.env;

export function decriptToken(token: string) : Promise<string> {
    return new Promise((resolve, reject) =>{
        if(token.split('.').length != 3) reject(new Error('Invalid token'));

        //@ts-ignore
        jwt.verify(token, SECRET_KEY, (error, decoded) => {
            if(error) reject(error)
            //@ts-ignore
            resolve(decoded.id)
        })
    });
}
export function encrypt(data: object){
    return new Promise((resolve, reject) =>{
        try {
            //@ts-ignore
            const token = jwt.sign(data, SECRET_KEY);
            resolve(token);
        } catch (error) {
            reject(error);
        }
    });
}