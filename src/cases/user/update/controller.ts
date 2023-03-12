import { DTOUpdateUser } from "../../../entities/DTOs/DTOUpdateUser";
import { errorFactory } from "../../../utils/errorFactory";
import * as dotenv from 'dotenv';
import { httpRequestAdapter } from "../../../adapters/httpRequestAdapter";
import { IController } from "../../../adapters/adaptersImplementations/adaptRouter";

dotenv.config();

export interface IUpdateUser{
    execute( data : DTOUpdateUser ) : Promise<boolean>
}

export const updateUserController = ( updateUser : IUpdateUser ) : IController =>{
    return{
        execute: async ( req : httpRequestAdapter ) => {

            try {                        
                const { userId } = req.header;
                const { username, name } = req.body;
                const key = req.file?.filename;
            
                if(!userId) throw errorFactory( 'Missing user authentication', 406);
                const profileURL = key && `${process.env.UPLOAD_URL}/img/user/${key}`;
                
                const data = new DTOUpdateUser(userId.toString(), username, name, profileURL);
                
                const updated = await updateUser.execute(data);
                
                if(updated) return 201;
                throw errorFactory('Error updating data');
            } catch (error) {
                console.error(error);
                return error;
            }
        }
    }
}