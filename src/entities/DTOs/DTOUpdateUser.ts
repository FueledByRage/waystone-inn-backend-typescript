export class DTOUpdateUser{

    constructor(
        public userId : string,
        public user?: string,
        public name?: string,
        public profileURL?: string,
    ){}

}