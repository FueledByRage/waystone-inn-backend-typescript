export class Comment{
    constructor(
        public postId: string,
        public authorId: string,
        public comment: string
    ){}
}