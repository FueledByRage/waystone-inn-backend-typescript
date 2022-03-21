import { FindByNameController } from "./controller";
import { findCommunityByName } from "./findByName";
import { MongooseCommunity } from "../../../repositories/implementations/communityMongooseImplementation";


const implementation = MongooseCommunity();
const find = findCommunityByName(implementation);
export const findByNameController = FindByNameController(find);