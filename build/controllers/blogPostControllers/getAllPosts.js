"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = void 0;
const postModel_1 = __importDefault(require("../../models/postModel/postModel"));
const getAllPosts = async (request, response) => {
    try {
        const allPosts = await postModel_1.default.findAll({});
        if (!allPosts) {
            return response.status(404).json({
                status: `error`,
                message: `Unable to get blogposts, contact admin`
            });
        }
        if (allPosts.length === 0) {
            return response.status(200).json({
                status: `success`,
                message: `No Post found`,
                allPosts
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Post found successfully`,
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
exports.getAllPosts = getAllPosts;
