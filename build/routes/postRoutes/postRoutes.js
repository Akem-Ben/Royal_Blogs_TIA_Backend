"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../../middlewares/authorization");
const userMakesPost_1 = require("../../controllers/blogPostControllers/userMakesPost");
const upload_1 = require("../../utilities/upload");
const getSinglePost_1 = require("../../controllers/blogPostControllers/getSinglePost");
const deletePost_1 = require("../../controllers/blogPostControllers/deletePost");
const getAllPosts_1 = require("../../controllers/blogPostControllers/getAllPosts");
const userLikesPost_1 = require("../../controllers/likesControllers/userLikesPost");
const userDislikes_1 = require("../../controllers/dislikesControllers/userDislikes");
const userMakesComments_1 = require("../../controllers/commentsControllers/userMakesComments");
const getAllPostComments_1 = require("../../controllers/commentsControllers/getAllPostComments");
const getLikesAndLikers_1 = require("../../controllers/likesControllers/getLikesAndLikers");
const getDislikeAndDislikers_1 = require("../../controllers/dislikesControllers/getDislikeAndDislikers");
const router = express_1.default.Router();
router.post("/create", authorization_1.authorizationFunction, upload_1.upload.single("postImage"), userMakesPost_1.userMakesPost);
router.get('/singlePost/:postId', getSinglePost_1.getSinglePost);
router.delete('/userPost/:postId', authorization_1.authorizationFunction, deletePost_1.deletePost);
router.get('/allPosts', getAllPosts_1.getAllPosts);
router.post('/likePost/:postId', authorization_1.authorizationFunction, userLikesPost_1.userLikesPost);
router.post('/dislikePost/:postId', authorization_1.authorizationFunction, userDislikes_1.userDisLikesPost);
router.post('/makeComment/:postId', authorization_1.authorizationFunction, userMakesComments_1.userMakesComments);
router.get('/allComments/:postId', getAllPostComments_1.getAllPostComments);
router.get('/allLikes/:postId', getLikesAndLikers_1.getAllPostLikes);
router.get('/allDislikes/:postId', getDislikeAndDislikers_1.getAllPostDislikes);
exports.default = router;
