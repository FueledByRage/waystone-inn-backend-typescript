import { readPostsController } from "./controller";
import { ReadPosts } from "./get";
import { MongoosePost } from "../../../repositories/implementations/postMongooseImplementation";

const implementation = MongoosePost();
const read = ReadPosts(implementation);1
export const ReadPostsController = readPostsController(read);