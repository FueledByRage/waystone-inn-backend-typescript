import { MongooseCommunity } from "../../../repositories/implementations/communityMongooseImplementation";
import { create } from "./create";
import { CreateController } from "./controller";
import { MongooseSub } from "../../../repositories/implementations/subMongoose";

const mongooseRepository = MongooseCommunity();
const subRepository = MongooseSub();
const createFunction =  create(mongooseRepository, subRepository);
export const CreateCommunityController = CreateController(createFunction);