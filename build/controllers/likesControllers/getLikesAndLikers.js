"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPostLikes = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const likesModel_1 = __importDefault(require("../../models/likesModel/likesModel"));
const getAllPostLikes = async (request, response) => {
    try {
        const { postId } = request.params;
        const allLikes = await likesModel_1.default.findAll({ where: { postId } });
        let likesWithOwners = await Promise.all(allLikes.map(async (likes) => {
            const user = await userModel_1.default.findOne({ where: { id: likes.ownerId } });
            if (user) {
                return {
                    ownerName: user.fullName,
                    ownerUserName: user.userName,
                    likes
                };
            }
            else {
                console.error(`Owner not found for like with ID: ${likes.ownerId}`);
                return likes;
            }
        }));
        if (!allLikes) {
            return response.status(404).json({
                status: `error`,
                message: `Unable to get likes`
            });
        }
        if (allLikes.length === 0) {
            return response.status(200).json({
                status: `success`,
                message: `No likes found`,
                likesWithOwners
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Likes found successfully`,
            likesWithOwners
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
exports.getAllPostLikes = getAllPostLikes;
