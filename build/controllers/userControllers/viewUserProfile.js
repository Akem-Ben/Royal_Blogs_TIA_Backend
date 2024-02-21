"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewProfile = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const viewProfile = async (request, response) => {
    try {
        const userId = request.user.id;
        const user = await userModel_1.default.findOne({ where: { id: userId } });
        if (!user) {
            return response.status(404).json({
                status: `error`,
                message: `User not found`
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Profile found successfully`,
            user
        });
    }
    catch (error) {
        return response.status(500).json({
            status: `error`,
            message: `Inernal Server Error`,
            error: error.message
        });
    }
};
exports.viewProfile = viewProfile;
