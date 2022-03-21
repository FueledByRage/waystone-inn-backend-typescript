import { MongooseCommunity } from "../../../repositories/implementations/communityMongooseImplementation";
import { create } from "./create";
import { CreateController } from "./controller";

const mongooseRepository = MongooseCommunity();
const createFunction =  create(mongooseRepository);
export const CreateCommunityController = CreateController(createFunction.execute);