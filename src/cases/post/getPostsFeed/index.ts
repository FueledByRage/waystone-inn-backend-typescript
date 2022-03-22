import { getPostsFeedController } from "./controller";
import { getPostsFeed } from "./get";
import { MongoosePost } from "../../../repositories/implementations/postMongooseImplementation";

const implementation = MongoosePost();
const read = getPostsFeed(implementation);
export const GetPostsFeedController = getPostsFeedController(read);