import { getPostsFeedController } from "./controller";
import { getPostsFeed } from "./get";
import { MongoosePost } from "../../../repositories/implementations/postMongooseImplementation";
import { MongooseLike } from "../../../repositories/implementations/likeMongooseImplementation";

const postRepository = MongoosePost();
const likeRepository = MongooseLike();
const read = getPostsFeed(postRepository, likeRepository);
export const GetPostsFeedController = getPostsFeedController(read);