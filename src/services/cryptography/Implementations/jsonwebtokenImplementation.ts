import { ICryptography } from "../ICryptography";
import { errorFactory } from "../../../utils/errorFactory";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY } = process.env;

export function JWTImplementaion() : ICryptography{
    return{
        encrypt(payload : string ) : Promise<string> {
            return new Promise((resolve, reject) =>{
                try {
                    //@ts-ignore
                    const payload = jwt.sign(data, SECRET_KEY);
                    resolve(payload);
                } catch (error) {
                    reject(error);
                }
            });
        },
        decript(token : string ) : Promise<string> {
            return new Promise((resolve, reject) =>{
                try {
                    if(token.split('.').length != 3) reject(errorFactory('Invalid token', 406));
            
                    //@ts-ignore
                    jwt.verify(token, SECRET_KEY, (error, decoded) => {
                        if(error) reject(error)
                        //@ts-ignore
                        resolve(decoded.id)
                    })
                    
                } catch (error) {
                    reject(errorFactory('Authentication error', 406));
                }
            });

        },
    }
}