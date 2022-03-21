import { Router } from "express";
import { CreateUserController } from "../cases/user/create/index";
import { CreateCommunityController } from "../cases/community/create/index";
import { LoginController } from "../cases/user/login";
import { findCommunityController } from "../cases/community/find";
import { ControllerCreatePost } from "../cases/post/create";
import { FindManyCommunitiesController } from "../cases/community/findMany";
import { findByNameController } from "../cases/community/findByName";
import { SubController } from "../cases/community/sub";
import { UnsubController } from "../cases/community/unsub";

const router = Router();

router.post('/user/register', CreateUserController.execute);
router.post('/user/login', LoginController.login);

router.post('/community/register', CreateCommunityController.execute);
router.get('/community/:id', findCommunityController.execute);
router.get('/communities', FindManyCommunitiesController.execute);
router.get('/communities/:name', findByNameController.execute);
router.get('/community/sub/:id', SubController.execute);
router.get('/community/unsub/:id', UnsubController.execute);

router.post('/post/register', ControllerCreatePost.execute);

export { router };