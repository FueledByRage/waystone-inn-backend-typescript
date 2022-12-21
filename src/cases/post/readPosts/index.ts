import { readPostsController } from "./controller";
import { ReadPosts } from "./get";
import { MongoosePost } from "../../../repositories/implementations/postMongooseImplementation";
import { MongooseLike } from "../../../repositories/implementations/likeMongooseImplementation";

const postRepository = MongoosePost();
const likeRepository = MongooseLike();
const read = ReadPosts(postRepository, likeRepository);
export const ReadPostsController = readPostsController(read);