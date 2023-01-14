export class DTOCommunity{

    public date : Date = new Date();

    constructor(
        public authorId: string,
        public name: string,
        public description: string,
    ){}
}