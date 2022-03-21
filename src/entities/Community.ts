export class Community{
    constructor(
        public authorId: string,
        public name: string,
        public description: string,
        public members: Array<string> = [authorId]
    ){}
}