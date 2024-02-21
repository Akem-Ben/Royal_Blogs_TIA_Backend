"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const postModel_1 = __importDefault(require("../../models/postModel/postModel"));
const deletePost = async (request, response) => {
    try {
        const userId = request.user.id;
        const user = await userModel_1.default.findOne({ where: { id: userId } });
        const { postId } = request.params;
        const findPost = await postModel_1.default.findOne({ where: { id: postId, ownerId: userId } });
        if (!findPost) {
            return response.status(400).json({
                status: `error`,
                message: `You are not authorised to delete this post`
            });
        }
        const deleted = await postModel_1.default.destroy({ where: { id: findPost.id, ownerId: userId } });
        if (!deleted) {
            return response.status(400).json({
                status: `error`,
                message: `Unable to delete post, contact admin`,
            });
        }
        const allPosts = await postModel_1.default.findAll({});
        return response.status(200).json({
            status: `success`,
            message: `Post deleted successfully`,
            allPosts
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
exports.deletePost = deletePost;
