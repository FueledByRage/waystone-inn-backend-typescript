import { MongooseCommunity } from "../../../repositories/implementations/communityMongooseImplementation";
import { FindMany } from "./findMany";
import { FindManyCommunityController } from "./controller";

const Implementation = MongooseCommunity()
const find = FindMany(Implementation);
export const FindManyCommunitiesController = FindManyCommunityController(find);