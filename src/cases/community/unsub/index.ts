import { unsub } from "./unsub";
import { UnsubCommunityController } from "./controller";
import { MongooseCommunity } from "../../../repositories/implementations/communityMongooseImplementation";


const MongooseImplementation = MongooseCommunity();
const Unsubscribe =  unsub(MongooseImplementation);
export const UnsubController = UnsubCommunityController(Unsubscribe);