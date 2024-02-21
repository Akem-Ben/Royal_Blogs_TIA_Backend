"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDisLikesPost = void 0;
const postModel_1 = __importDefault(require("../../models/postModel/postModel"));
const likesModel_1 = __importDefault(require("../../models/likesModel/likesModel"));
const dislikesModel_1 = __importDefault(require("../../models/dislikesModel/dislikesModel"));
const uuid_1 = require("uuid");
const userDisLikesPost = async (request, response) => {
    try {
        const userId = request.user.id;
        const { postId } = request.params;
        const findPost = await postModel_1.default.findOne({ where: { id: postId } });
        if (!findPost) {
            return response.status(404).json({
                status: `error`,
                message: `post not found`
            });
        }
        const checkIfDisLiked = await dislikesModel_1.default.findOne({ where: { postId, ownerId: userId } });
        if (checkIfDisLiked) {
            const unDisLike = await dislikesModel_1.default.destroy({ where: { postId, ownerId: userId } });
            let numberOfDisLikes = findPost.dislikes;
            const newNumberOfDisLikes = numberOfDisLikes - 1;
            const updatePostLikes = await postModel_1.default.update({ dislikes: newNumberOfDisLikes }, { where: { id: postId } });
            const findNewPost = await postModel_1.default.findOne({ where: { id: postId } });
            const testDislike = await dislikesModel_1.default.findOne({ where: { postId, ownerId: userId } });
            return response.status(201).json({
                status: `success`,
                message: 'post undisliked',
                findNewPost,
                testDislike
            });
        }
        const checkIfLiked = await likesModel_1.default.findOne({ where: { postId, ownerId: userId } });
        if (checkIfLiked) {
            const destroyLike = await likesModel_1.default.destroy({ where: { postId, ownerId: userId } });
            let numberOfLikes = findPost.likes;
            const newNumberOfLikes = numberOfLikes - 1;
            const updatePostLikes = await postModel_1.default.update({ likes: newNumberOfLikes }, { where: { id: postId } });
        }
        const newDisLike = await dislikesModel_1.default.create({
            id: (0, uuid_1.v4)(),
            postId,
            ownerId: userId
        });
        if (newDisLike) {
            let blogDisLikes = findPost.dislikes;
            const newDisLikes = blogDisLikes + 1;
            await postModel_1.default.update({ dislikes: newDisLikes }, { where: { id: postId } });
            const newPost = await postModel_1.default.findOne({ where: { id: postId } });
            const findDisLike = await dislikesModel_1.default.findOne({ where: { id: newDisLike.id } });
            return response.status(200).json({
                status: `success`,
                message: `post successfully disliked`,
                newPost,
                findDisLike
            });
        }
        return response.status(400).json({
            status: `error`,
            message: `post not successfully liked`,
        });
    }
    catch (error) {
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
            error: error.message,
        });
    }
};
exports.userDisLikesPost = userDisLikesPost;
