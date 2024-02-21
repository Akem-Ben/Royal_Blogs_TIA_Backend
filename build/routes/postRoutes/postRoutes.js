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
const router = express_1.default.Router();
router.post("/create", authorization_1.authorizationFunction, upload_1.upload.single("postImage"), userMakesPost_1.userMakesPost);
router.get('/singlePost/:postId', getSinglePost_1.getSinglePost);
router.delete('/userPost/:postId', authorization_1.authorizationFunction, deletePost_1.deletePost);
router.get('/allPosts', getAllPosts_1.getAllPosts);
exports.default = router;
