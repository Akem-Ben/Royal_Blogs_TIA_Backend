"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPostDislikes = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const dislikesModel_1 = __importDefault(require("../../models/dislikesModel/dislikesModel"));
const getAllPostDislikes = async (request, response) => {
    try {
        const { postId } = request.params;
        const allDislikes = await dislikesModel_1.default.findAll({ where: { postId } });
        let dislikesWithOwners = await Promise.all(allDislikes.map(async (dislikes) => {
            const user = await userModel_1.default.findOne({ where: { id: dislikes.ownerId } });
            if (user) {
                return {
                    ownerName: user.fullName,
                    ownerUserName: user.userName,
                    dislikes
                };
            }
            else {
                console.error(`Owner not found for dislike with ID: ${dislikes.ownerId}`);
                return dislikes;
            }
        }));
        if (!allDislikes) {
            return response.status(404).json({
                status: `error`,
                message: `Unable to get dislikes`
            });
        }
        if (allDislikes.length === 0) {
            return response.status(200).json({
                status: `success`,
                message: `No dislikes found`,
                dislikesWithOwners
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `dislikes found successfully`,
            dislikesWithOwners
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
exports.getAllPostDislikes = getAllPostDislikes;
