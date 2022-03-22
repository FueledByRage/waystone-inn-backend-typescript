import { readPostController } from "./controller";
import { ReadPost } from "./get";
import { MongoosePost } from "../../../repositories/implementations/postMongooseImplementation";

const implementation = MongoosePost();
const read = ReadPost(implementation);
export const ReadPostController = readPostController(read);