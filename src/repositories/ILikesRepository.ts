import { DTOLike } from "../entities/DTOs/DTOLikes";
import { Like } from "../entities/like";

export interface ILikeRepository{
    create( DTOLike : DTOLike ) : Promise<boolean>,
    read( DTOLike : DTOLike ) : Promise<Like | void | null >,
    delete( DTOLike : DTOLike ) : Promise<boolean>,
    getCount( postId : string ) : Promise<number>
}