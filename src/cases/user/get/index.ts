import { UserMongoose } from "../../../repositories/implementations/userMongooseImplementation";
import { GetUser } from "./getUser";
import { getUserController } from "./controller";

const getImplementation = UserMongoose();
const get = GetUser(getImplementation);

export const getByUsernameController = getUserController(get);