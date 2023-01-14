export class DTOPost{

    public date : Date = new Date();

    constructor(
        public authorId: string,
        public communityId: string,
        public title: string,
        public body: string,
        public filename?: string,
        public url? : string
    ){}
}