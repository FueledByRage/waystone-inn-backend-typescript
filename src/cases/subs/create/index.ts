import { MongooseCommunity } from "../../../repositories/implementations/communityMongooseImplementation";
import { MongooseSub } from "../../../repositories/implementations/subMongoose";
import { createSubController } from "./controller";
import { createSub } from "./createSub";


const subRepository = MongooseSub();
const communityRepository = MongooseCommunity();
const create = createSub(subRepository, communityRepository);
export const controllerSub = createSubController(create); 