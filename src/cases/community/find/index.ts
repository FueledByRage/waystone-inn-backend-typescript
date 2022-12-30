import { MongooseCommunity } from "../../../repositories/implementations/communityMongooseImplementation";
import { MongooseSub } from "../../../repositories/implementations/subMongoose";
import { findController } from "./controller";
import { find } from "./find";

const communityRepository = MongooseCommunity();
const subRepository = MongooseSub();
const findCommunity = find(communityRepository, subRepository);
export const findCommunityController = findController(findCommunity);