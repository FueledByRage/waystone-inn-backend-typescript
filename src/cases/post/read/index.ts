import { readPostController } from "./controller";
import { ReadPost } from "./get";
import { MongoosePost } from "../../../repositories/implementations/postMongooseImplementation";
import { MongooseLike } from "../../../repositories/implementations/likeMongooseImplementation";

const postRepository = MongoosePost();
const likeRepository = MongooseLike();
const read = ReadPost(postRepository, likeRepository);
export const ReadPostController = readPostController(read);