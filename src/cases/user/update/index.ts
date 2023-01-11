import { UserMongoose } from "../../../repositories/implementations/userMongooseImplementation";
import { updateUserController } from "./controller";
import { updateUser } from "./update";


const userRepository = UserMongoose();
const executeUpdate = updateUser(userRepository);
export const userUpdateController = updateUserController(executeUpdate);