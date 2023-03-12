import { MongoosePost } from "../../../repositories/implementations/postMongooseImplementation";
import { CreatePost } from "./create";
import { CreatePostController } from "./controller";
import { MongooseSub } from "../../../repositories/implementations/subMongoose";
import { CreatePostAdaptedController } from "./CreatePostController";

const postRepository = MongoosePost();
const subRepository = MongooseSub();
const create = CreatePost(postRepository, subRepository);
export const createPostController = CreatePostAdaptedController(create);
export const ControllerCreatePost = CreatePostController(create);