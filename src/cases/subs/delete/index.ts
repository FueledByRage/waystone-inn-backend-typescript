import { MongooseSub } from "../../../repositories/implementations/subMongoose";
import { deleteSubController } from "./controller";
import { deleteSub } from "./deleteSub";



const subRepository = MongooseSub();
const deleteCase = deleteSub(subRepository);
export const subDeleteController = deleteSubController(deleteCase);