export interface IUser{
    _id: string;
    name: string;
    user: string;
    email: string;
    password: string;
    date: Date;
    subs: Array<string>;
    profileURL: string;
}