import { getPostsFeedController } from "./controller";
import { getPostsFeed } from "./get";
import { MongoosePost } from "../../../repositories/implementations/postMongooseImplementation";
import { MongooseLike } from "../../../repositories/implementations/likeMongooseImplementation";
import { MongooseSub } from "../../../repositories/implementations/subMongoose";

const postRepository = MongoosePost();
const likeRepository = MongooseLike();
const subRepository = MongooseSub()
const read = getPostsFeed(postRepository, likeRepository, subRepository);
export const GetPostsFeedController = getPostsFeedController(read);