export interface iCommunity{
    authorId: string;
    _id: string;
    name: string;
    description: string;
    members: Array<string>;
    date: Date;
}