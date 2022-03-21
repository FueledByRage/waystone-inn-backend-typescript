import { Router } from "express";
import * as CreateUserController from "../cases/user/create/index";
import * as CreateCommunityController from "../cases/community/create/index";
import * as LoginController from "../cases/user/login";
import { findCommunityController } from "../cases/community/find";
import { ControllerCreatePost } from "../cases/post/create";
import { FindManyCommunitiesController } from "../cases/community/findMany";
import { findByNameController } from "../cases/community/findByName";
import { SubController } from "../cases/community/sub";

const router = Router();

router.post('/user/register', CreateUserController.controller.execute);
router.post('/user/login', LoginController.loginController.login);

router.post('/community/register', CreateCommunityController.controller.execute);
router.get('/community/:id', findCommunityController.execute);
router.get('/communities', FindManyCommunitiesController.execute);
router.get('/communities/:name', findByNameController.execute);
router.get('/community/sub/:id', SubController.execute);

router.post('/post/register', ControllerCreatePost.execute);

export { router };