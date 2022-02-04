import { UserMongoose } from "../../../repositories/implementations/userMongooseImplementation";
import { controllerLogin } from "./controller";
import { login } from "./login";

const userRepository = new UserMongoose();
const userLogin = login(userRepository);
export const loginController = controllerLogin(userLogin.execute);