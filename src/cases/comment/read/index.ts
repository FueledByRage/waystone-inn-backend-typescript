import { readCommentsController } from "./controller";
import { ReadComments } from "./get";
import { MongooseComment } from "../../../repositories/implementations/commentMongooseImplementation";

const implementation = MongooseComment();
const read = ReadComments(implementation);
export const ReadCommentsController = readCommentsController(read);