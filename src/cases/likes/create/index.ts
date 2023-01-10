import { MongooseLike } from "../../../repositories/implementations/likeMongooseImplementation";
import { UserMongoose } from "../../../repositories/implementations/userMongooseImplementation";
import { createLikeController } from "./controller";
import { createLike } from "./create";

const likeRepository = MongooseLike();
const userRepository = UserMongoose();
const create = createLike(likeRepository, userRepository);
export const controllerCreateLike = createLikeController(create);

