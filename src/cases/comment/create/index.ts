import { MongooseComment } from "../../../repositories/implementations/commentMongooseImplementation";
import { CreateComment } from "./create";
import { createCommentController } from "./controller";

const implementation = MongooseComment();
const create = CreateComment(implementation);
export const CreateCommentController = createCommentController(create);