export class DTOPostByCommunity{

    constructor(
        public userId : string,
        public communtityId : string,
        public page : number,
        public register : number
    ){}
}