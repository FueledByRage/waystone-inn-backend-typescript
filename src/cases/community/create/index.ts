import { MongooseCommunity } from "../../../repositories/implementations/communityMongooseImplementation";
import { create } from "./create";
import { CreateController } from "./controller";

const mongooseRepository = new MongooseCommunity();
const createFunction =  create(mongooseRepository);
export const controller = CreateController(createFunction.execute);