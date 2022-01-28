import { Router } from "express";
import * as CreateUserController from "../cases/user/create/index";

const router = Router();

router.post('/inn/user/register', CreateUserController.controller.execute);


export { router };