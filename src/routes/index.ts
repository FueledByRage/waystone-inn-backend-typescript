import { Router } from "express";
import * as CreateUserController from "../cases/user/create/index";
import * as CreateCommunityController from "../cases/community/create/index";
import * as LoginController from "../cases/user/login";

const router = Router();

router.post('/user/register', CreateUserController.controller.execute);
router.post('/user/login', LoginController.loginController.login);

router.post('/community/register', CreateCommunityController.controller.execute);
//router.get('/community/:id')

export { router };