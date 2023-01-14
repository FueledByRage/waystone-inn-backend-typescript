export class DTOComment{

    public date : Date = new Date();

    constructor(
        public authorId : string,
        public postId : string,
        public comment : string
    ){}
}