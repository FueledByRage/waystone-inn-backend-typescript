export class DTOPost{
    constructor(
        public authorId: string,
        public communityId: string,
        public title: string,
        public body: string,
        public filename?: string
    ){}
}