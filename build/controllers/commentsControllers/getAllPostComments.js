"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPostComments = void 0;
const commentModel_1 = require("../../models/commentModel/commentModel");
const getAllPostComments = async (request, response) => {
    try {
        const allComments = await commentModel_1.Comments.findAll({});
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
                allComments
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Comments found successfully`,
            allComments
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
