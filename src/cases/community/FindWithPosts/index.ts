import { MongooseCommunity } from "../../../repositories/implementations/communityMongooseImplementation";
import { find } from "./find";
import { findCommunityPosts } from "./controller";
import { MongoosePost } from "../../../repositories/implementations/postMongooseImplementation";
import { MongooseSub } from "../../../repositories/implementations/subMongoose";
import { JWTImplementaion } from "../../../services/cryptography/Implementations/jsonwebtokenImplementation";


const communityRepo = MongooseCommunity();
const postRepo = MongoosePost();
const subRepository = MongooseSub();
const cryptography = JWTImplementaion();
const executeFind = find(communityRepo, postRepo, subRepository, cryptography   );
const controller = findCommunityPosts(executeFind);