import { MongooseComment } from "../../../repositories/implementations/commentMongooseImplementation";
import { deleteComment } from "./delete";
import { deleteCommentController } from "./controller";

const implementation = MongooseComment();
const DeleteComment = deleteComment(implementation);
export const DeleteCommentController = deleteCommentController(DeleteComment);