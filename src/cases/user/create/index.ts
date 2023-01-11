import { CreateController } from "./controller";
import { CreateUser } from "./create";
import { UserMongoose } from "../../../repositories/implementations/userMongooseImplementation";
import { JWTImplementaion } from "../../../services/cryptography/Implementations/jsonwebtokenImplementation";
import { RabbitMqImplementation } from "../../../MessageBrokers/RabbitMQ/Implementation";

const messageBroker = RabbitMqImplementation();
const createImplementation = UserMongoose();
const create = CreateUser(createImplementation, messageBroker);
const cryptography = JWTImplementaion();
export const CreateUserController = CreateController(create, cryptography);