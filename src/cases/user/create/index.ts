import { CreateController } from "./controller";
import { CreateUser } from "./create";
import { UserMongoose } from "../../../repositories/implementations/userMongooseImplementation";
import { JWTImplementaion } from "../../../services/cryptography/Implementations/jsonwebtokenImplementation";

const createImplementation = UserMongoose();

const create = CreateUser(createImplementation);
const cryptography = JWTImplementaion();
export const CreateUserController = CreateController(create, cryptography);