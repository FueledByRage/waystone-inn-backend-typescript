export class Sub{
    constructor(
        public userId : string,
        public communityId : string,
        public adm : boolean,
        public subAt: Date,
        public _id?: string
    ){}
}