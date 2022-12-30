import { DTOSub } from "../../../entities/DTOs/DTOSub";
import { ICommunityRepository } from "../../../repositories/ICommunityRepository";
import { ISubRepository } from "../../../repositories/ISubRepository";
import { decriptToken } from "../../../utils/cryptography";
import { errorFactory } from "../../../utils/errorFactory";
import { ICreateSub } from "./controller";



export function createSub( repository : ISubRepository, communityRepository : ICommunityRepository ) : ICreateSub {

    return{
        execute(data : DTOSub ) : Promise<boolean> {
            return new Promise( async (resolve, reject) =>{
                try {
                    const community = await communityRepository.read(data.communityId);
                    data.userId = await decriptToken(data.userId);
                    await repository.read(data).catch( async error =>{

                        if(!community) throw errorFactory('Invalid community', 406);
    
                        await repository.create(data);
    
                        resolve(true);    
                    });

                    throw errorFactory('This user is already a sub.', 406);

                } catch (error) {
                    reject(error);
                }
            });
        }
    }
}