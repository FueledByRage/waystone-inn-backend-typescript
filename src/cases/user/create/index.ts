import { CreateController } from "./controller";
import { CreateUser } from "./create";
import { UserMongoose } from "../../../repositories/implementations/userMongooseImplementation";

const createImplementation = new UserMongoose();

const create = CreateUser(createImplementation);
const controller = CreateController(create);

export { create, controller }