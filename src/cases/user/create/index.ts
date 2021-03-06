import { CreateController } from "./controller";
import { CreateUser } from "./create";
import { UserMongoose } from "../../../repositories/implementations/userMongooseImplementation";

const createImplementation = UserMongoose();

const create = CreateUser(createImplementation);
export const CreateUserController = CreateController(create);