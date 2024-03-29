export interface IPost {
    _id: string,
    communityId: string
    authorId: string,
    title: string,
    body: string,
    date: Date,
    url: string,
    fileName: string,
    likes: number,
    dislikes: number,
    liked : boolean,
    disliked : boolean,
}