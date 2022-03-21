import { UserMongoose } from "../../../repositories/implementations/userMongooseImplementation";
import { controllerLogin } from "./controller";
import { login } from "./login";

const userRepository = UserMongoose();
const userLogin = login(userRepository);
export const LoginController = controllerLogin(userLogin.execute);