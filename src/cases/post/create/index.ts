import { MongoosePost } from "../../../repositories/implementations/postMongooseImplementation";
import { CreatePost } from "./create";
import { CreatePostController } from "./controller";

const implementation = MongoosePost();
const create = CreatePost(implementation);
export const ControllerCreatePost = CreatePostController(create);