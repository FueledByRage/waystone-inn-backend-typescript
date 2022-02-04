import { MongooseCommunity } from "../../../repositories/implementations/communityMongooseImplementation";
import { findController } from "./controller";
import { find } from "./find";

const communityRepository = new MongooseCommunity();
const findCommunity = find(communityRepository);
export const controller = findController(findCommunity.execute);