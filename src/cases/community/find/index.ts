import { MongooseCommunity } from "../../../repositories/implementations/communityMongooseImplementation";
import { MongooseSub } from "../../../repositories/implementations/subMongoose";
import { JWTImplementaion } from "../../../services/cryptography/Implementations/jsonwebtokenImplementation";
import { findController } from "./controller";
import { find } from "./find";

const communityRepository = MongooseCommunity();
const subRepository = MongooseSub();
const cryptographyImplementation = JWTImplementaion()
const findCommunity = find(communityRepository, subRepository, cryptographyImplementation);
export const findCommunityController = findController(findCommunity);