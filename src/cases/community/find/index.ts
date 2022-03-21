import { MongooseCommunity } from "../../../repositories/implementations/communityMongooseImplementation";
import { findController } from "./controller";
import { find } from "./find";

const communityRepository = MongooseCommunity();
const findCommunity = find(communityRepository);
export const findCommunityController = findController(findCommunity.execute);