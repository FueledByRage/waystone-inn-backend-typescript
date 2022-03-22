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
import { ReadPostsController } from "../cases/post/readPosts";
import { ReadPostController } from "../cases/post/read";
import { GetPostsFeedController } from "../cases/post/getPostsFeed";
import { DeletePostController } from "../cases/post/delete";
import { CreateCommentController } from "../cases/comment/create";

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
router.get('/posts/:id/:page/:registers', ReadPostsController.execute);
router.get('/post/:id', ReadPostController.execute);
router.get('/feed/:page/:registers', GetPostsFeedController.execute);
router.delete('/post/:id', DeletePostController.execute);

router.post('/comment/register', CreateCommentController.execute)

export { router };