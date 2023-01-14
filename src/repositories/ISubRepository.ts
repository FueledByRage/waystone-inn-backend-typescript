import { DTOSub } from "../entities/DTOs/DTOSub";
import { ISub } from "../entities/Abstractions/ISub";
import { Sub } from "../entities/sub";

export interface ISubRepository{
    create(data : DTOSub ) : Promise<ISub>;
    remove(data : DTOSub) : Promise<void>;
    read(data : DTOSub ) : Promise<ISub>;
    getUserSubs( userId : string ) : Promise<ISub[]>
}