import { MongoosePost } from "../../../repositories/implementations/postMongooseImplementation";
import { deletePost } from "./delete";
import { deletePostController } from "./controller";

const implementation = MongoosePost();
const DeletePost = deletePost(implementation);
export const DeletePostController = deletePostController(DeletePost);