"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPostComments = void 0;
const commentModel_1 = require("../../models/commentModel/commentModel");
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const getAllPostComments = async (request, response) => {
    try {
        const { postId } = request.params;
        const allComments = await commentModel_1.Comments.findAll({ where: { postId } });
        let commentsWithOwners = await Promise.all(allComments.map(async (comments) => {
            const user = await userModel_1.default.findOne({ where: { id: comments.ownerId } });
            if (user) {
                return {
                    ownerName: user.fullName,
                    ownerImage: user.profileImage,
                    comment: comments.commentText
                };
            }
            else {
                console.error(`Owner not found for post with ID: ${comments.ownerId}`);
                return comments;
            }
        }));
        if (!allComments) {
            return response.status(404).json({
                status: `error`,
                message: `Unable to get comments, contact admin`
            });
        }
        if (allComments.length === 0) {
            return response.status(200).json({
                status: `success`,
                message: `No Comments found`,
                commentsWithOwners
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Comments found successfully`,
            commentsWithOwners
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
exports.getAllPostComments = getAllPostComments;
