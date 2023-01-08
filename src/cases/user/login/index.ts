import { UserMongoose } from "../../../repositories/implementations/userMongooseImplementation";
import { JWTImplementaion } from "../../../services/cryptography/Implementations/jsonwebtokenImplementation";
import { controllerLogin } from "./controller";
import { login } from "./login";

const userRepository = UserMongoose();
const userLogin = login(userRepository);
const cryptography = JWTImplementaion();

export const LoginController = controllerLogin(userLogin, cryptography);