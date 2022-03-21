import { sub } from "./sub";
import { SubCommunityController } from "./controller";
import { MongooseCommunity } from "../../../repositories/implementations/communityMongooseImplementation";


const MongooseImplementation = MongooseCommunity();
const subscribe =  sub(MongooseImplementation);
export const SubController = SubCommunityController(subscribe);