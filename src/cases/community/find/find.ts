import { ICommunityRepository } from "../../../repositories/ICommunityRepository";
import { errorFactory } from "../../../utils/errorFactory";
import { decriptToken } from "../../../utils/cryptography";
import { IFindCommunityOutput } from "./controller";

export function find(communityRepository: ICommunityRepository){
    return{
        execute:(id: string, token : string | string[] ) : Promise<IFindCommunityOutput> =>{
            return new Promise( async (resolve, reject)=>{
                const community = await communityRepository.read(id)
                .catch( e =>{ reject(new Error('Error finding community.')) });

                //@ts-ignore
                const userId = await decriptToken(token).catch((error: Error) =>{
                    const createdError = errorFactory('Error validating token.', 406);
                    reject(createdError);
                });                
                
                const sub = token == '' ? false : community?.members?.includes(userId || '');
                community && Reflect.deleteProperty(
                    community,
                    'members'
                );

                resolve({ community, sub });
            });
        }
    }
}