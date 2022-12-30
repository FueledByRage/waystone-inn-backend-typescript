import { resolve } from "path";
import { DTOSub } from "../../entities/DTOs/DTOSub";
import { ISub } from "../../entities/DTOs/ISub";
import { Sub } from "../../entities/sub";
import { SubModel } from "../../models/sub";
import { errorFactory } from "../../utils/errorFactory";
import { ISubRepository } from "../ISubRepository";

export function MongooseSub() : ISubRepository{
    return{
        create: ( data : DTOSub ) : Promise<Sub> => {
            return new Promise( async (resolve, reject) =>{
                try {
                    const sub = await (await SubModel.create(data)).save();
                    
                    resolve(sub);
                } catch (error) {
                    console.error(error);
                    reject(error);
                }
            });            
        },
        remove: (data : DTOSub) : Promise<boolean> =>{
            return new Promise( async (resolve, reject) =>{
                try {
                    const deleteSub = await SubModel.deleteOne({
                        communityid: data.communityId,
                        userId : data.userId
                    });

                    const deleted = deleteSub.deletedCount > 0;
                    resolve(deleted);
                } catch (error) {
                    console.error(error);
                    reject(error);                    
                }
            });
        },
        read: ( data : DTOSub ) : Promise<ISub> =>{
            return new Promise(async (resolve, reject) =>{
                try {
                    const sub = await SubModel.findOne({ communityId : data.communityId, userId : data.userId });
                    
                    if(sub) return resolve(sub);

                    throw errorFactory('Error finding sub', 404);

                } catch (error) {
                    reject(error);
                }
            });
        }
    }
}