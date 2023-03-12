import { Router } from "express";
import { CreateUserController } from "../cases/user/create/index";
import { CreateCommunityController } from "../cases/community/create/index";
import { LoginController } from "../cases/user/login";
import { findCommunityController } from "../cases/community/find";
import { ControllerCreatePost, createPostController } from "../cases/post/create";
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
import { subDeleteController } from "../cases/subs/delete";
import { controllerCreateLike } from "../cases/likes/create";
import { userUpdateController } from "../cases/user/update";
import { adaptRouter } from "../adapters/adaptersImplementations/adaptRouter";
import { adapterMiddleware } from "../adapters/adaptersImplementations/adapterMiddleware";
import { adaptedAuthenticationMiddleware } from "../middlewares/authenticationMiddleware";
const authenticationMiddleware = adaptedAuthenticationMiddleware();

const router = Router();

router.post('/user/register', uploads.single('file'), adaptRouter(CreateUserController));
router.post('/user/login', adaptRouter(LoginController));
router.get('/user/:username', adaptRouter(getByUsernameController))
router.put('/user/update', adapterMiddleware(authenticationMiddleware), uploads.single('file'),  adaptRouter(userUpdateController) );

router.post('/community/register', adapterMiddleware(authenticationMiddleware), CreateCommunityController.execute);
router.get('/community/read/:id', findCommunityController.execute);
router.get('/communities', adapterMiddleware(authenticationMiddleware), FindManyCommunitiesController.execute);
router.get('/communities/:name', findByNameController.execute);


router.post('/post/register', adapterMiddleware(authenticationMiddleware), uploads.single('file'), adaptRouter( createPostController ));
router.get('/posts/:id/:page/:registers', adapterMiddleware(authenticationMiddleware), ReadPostsController.execute);
router.get('/post/:id', ReadPostController.execute);
router.get('/feed/:page/:registers', adapterMiddleware(authenticationMiddleware), GetPostsFeedController.execute);
router.delete('/post/:id', adapterMiddleware(authenticationMiddleware), DeletePostController.execute);

router.post('/comment/register', adapterMiddleware(authenticationMiddleware), CreateCommentController.execute);
router.get('/comments/:id', ReadCommentsController.execute);
router.delete('/comment/:id', adapterMiddleware(authenticationMiddleware), DeleteCommentController.execute);

router.get('/sub/:communityId', adapterMiddleware(authenticationMiddleware), controllerSub.execute);
router.delete('/sub/delete/:communityId', adapterMiddleware(authenticationMiddleware),  subDeleteController.execute);

router.get('/like/create/:postId', adapterMiddleware(authenticationMiddleware), controllerCreateLike.execute);
router.delete('/like/:postId', adapterMiddleware(authenticationMiddleware), deleteLikeController.execute);

export { router };