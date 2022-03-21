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
    listOfUsersWhoLikedIt?: Array<String>,
    listOfUsersWhoDislikedIt?: Array<String>,
    liked? : boolean,
    disliked? : boolean,
}