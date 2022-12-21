import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
dotenv.config();

const { SECRET_KEY } = process.env;

export function decriptToken(token: string) : Promise<string> {
    return new Promise((resolve, reject) =>{
        try {
            if(token.split('.').length != 3) reject(new Error('Invalid token'));
    
            //@ts-ignore
            jwt.verify(token, SECRET_KEY, (error, decoded) => {
                if(error) reject(error)
                //@ts-ignore
                resolve(decoded.id)
            })
            
        } catch (error) {
            reject(new Error('An error has ocurried with the autenthication'))
        }
    });
}
export function encrypt(data: Object){
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