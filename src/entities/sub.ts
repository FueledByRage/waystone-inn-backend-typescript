import { DTOSub } from "./DTOs/DTOSub";

export class Sub{

    public userId : string;
    public communityId : string;
    public adm : boolean;
    public subAt: Date;
    public _id: string;

    constructor( data: DTOSub, subAt : Date, id : string ){
        this.userId = data.userId;
        this.communityId = data.communityId;
        this.adm = data.adm;
        this.subAt = subAt;
        this._id = id;
    }
}