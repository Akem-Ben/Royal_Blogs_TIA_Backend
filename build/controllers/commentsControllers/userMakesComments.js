"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMakesComments = void 0;
const uuid_1 = require("uuid");
const commentModel_1 = require("../../models/commentModel/commentModel");
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const postModel_1 = __importDefault(require("../../models/postModel/postModel"));
const userMakesComments = async (request, response) => {
    try {
        const { commentText } = request.body;
        const userId = request.user.id;
        const user = await userModel_1.default.findOne({ where: { id: userId } });
        const { postId } = request.params;
        const findPost = await postModel_1.default.findOne({ where: { id: postId } });
        if (!findPost) {
            return response.status(404).json({
                status: `error`,
                message: `Post not found, contact the admin`,
            });
        }
        const newComment = await commentModel_1.Comments.create({
            commentId: (0, uuid_1.v4)(),
            postId,
            userName: user.userName,
            commentText,
            likes: 0,
            dislikes: 0,
            ownerId: userId
        });
        const findComment = await commentModel_1.Comments.findOne({ where: { commentId: newComment.commentId } });
        if (!findComment) {
            return response.status(400).json({
                status: `error`,
                message: `Unable to make comment, please try again`
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Comment successfully made`,
            findComment
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
            error: error.message
        });
    }
};
exports.userMakesComments = userMakesComments;
