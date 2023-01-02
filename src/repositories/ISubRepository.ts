import { DTOSub } from "../entities/DTOs/DTOSub";
import { ISub } from "../entities/DTOs/ISub";
import { Sub } from "../entities/sub";

export interface ISubRepository{
    create(data : DTOSub ) : Promise<Sub>;
    remove(data : DTOSub) : Promise<boolean>;
    read(data : DTOSub ) : Promise<ISub>;
    getUserSubs( userId : string ) : Promise<ISub[]>
}