export class DTOPostByCommunity{

    constructor(
        public token : string,
        public communtityId : string,
        public page : number,
        public register : number
    ){}
}