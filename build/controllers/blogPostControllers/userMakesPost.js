"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMakesPost = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const postModel_1 = __importDefault(require("../../models/postModel/postModel"));
const uuid_1 = require("uuid");
const userMakesPost = async (request, response) => {
    try {
        const userId = request.user.id;
        if (!userId) {
            return response.status(400).json({
                status: `error`,
                message: `you must be logged in`
            });
        }
        const user = await userModel_1.default.findOne({ where: { id: userId } });
        if (!user) {
            return response.status(404).json({
                status: `error`,
                message: `User not found, contact admin`
            });
        }
        const { postText, title } = request.body;
        const newPost = await postModel_1.default.create({
            id: (0, uuid_1.v4)(),
            ownerId: userId,
            postText,
            title,
            likes: 0,
            dislikes: 0,
            postImage: request.file.path
        });
        const findPost = await postModel_1.default.findOne({ where: { id: newPost.id } });
        if (!findPost) {
            return response.status(400).json({
                status: `error`,
                message: `Post not created`,
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Post successfully created`,
            findPost
        });
    }
    catch (error) {
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
            error: error.message
        });
    }
};
exports.userMakesPost = userMakesPost;
