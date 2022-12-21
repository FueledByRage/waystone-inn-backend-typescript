import { MongooseCommunity } from "../../../repositories/implementations/communityMongooseImplementation";
import { find } from "./find";
import { findCommunityPosts } from "./controller";
import { MongoosePost } from "../../../repositories/implementations/postMongooseImplementation";


const communityRepo = MongooseCommunity();
const postRepo = MongoosePost();
const executeFind = find(communityRepo, postRepo);
const controller = findCommunityPosts(executeFind);