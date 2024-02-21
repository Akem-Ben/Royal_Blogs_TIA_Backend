"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSinglePost = void 0;
const postModel_1 = __importDefault(require("../../models/postModel/postModel"));
const getSinglePost = async (request, response) => {
    try {
        const { postId } = request.params;
        const findPost = await postModel_1.default.findOne({ where: { id: postId } });
        if (!findPost) {
            return response.status(404).json({
                status: `error`,
                message: `Post not found`
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Post found successfully`,
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
exports.getSinglePost = getSinglePost;
