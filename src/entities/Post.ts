export class Post{
    constructor(
        public authorId: string,
        public communityId: string,
        public title: string,
        public body: string,
        public date: number = Date.now(),
        public fileName: string = '',
        public url: string = '',
    ){}
}