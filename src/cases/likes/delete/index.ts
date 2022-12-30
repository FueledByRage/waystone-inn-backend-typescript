import { MongooseLike } from "../../../repositories/implementations/likeMongooseImplementation";
import { removeLike } from "./remove";
import { removeLikeController } from "./controller";

const likeRepository = MongooseLike();
const remove = removeLike(likeRepository);
export const deleteLikeController =  removeLikeController(remove);