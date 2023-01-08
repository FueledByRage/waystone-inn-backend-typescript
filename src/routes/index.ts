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
import { ReadCommentsController } from "../cases/comment/read";
import { DeleteCommentController } from "../cases/comment/delete";
import { getByUsernameController } from "../cases/user/get";
import { deleteLikeController } from "../cases/likes/delete";
import { uploads } from "../middlewares/multer";
import { controllerSub } from "../cases/subs/create";
import { authMiddleware } from "../middlewares/authenticationMiddleware";
import { subDeleteController } from "../cases/subs/delete";


const router = Router();

router.post('/user/register', uploads.single('file'), CreateUserController.execute);
router.post('/user/login', LoginController.login);
router.get('/user/:username', getByUsernameController.execute)

router.post('/community/register', authMiddleware, CreateCommunityController.execute);
router.get('/community/read/:id', findCommunityController.execute);
router.get('/communities', authMiddleware, FindManyCommunitiesController.execute);
router.get('/communities/:name', findByNameController.execute);


router.post('/post/register', authMiddleware, uploads.single("file") , ControllerCreatePost.execute);
router.get('/posts/:id/:page/:registers', authMiddleware, ReadPostsController.execute);
router.get('/post/:id', ReadPostController.execute);
router.get('/feed/:page/:registers', authMiddleware, GetPostsFeedController.execute);
router.delete('/post/:id', authMiddleware, DeletePostController.execute);

router.post('/comment/register', CreateCommentController.execute);
router.get('/comments/:id', ReadCommentsController.execute);
router.delete('/comment/:id', DeleteCommentController.execute);

router.get('/sub/:communityId', authMiddleware, controllerSub.execute);
router.delete('/sub/delete/:communityId', authMiddleware,  subDeleteController.execute);

router.delete('/like/:postId', deleteLikeController.execute);

export { router };