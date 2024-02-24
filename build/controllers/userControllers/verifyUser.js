"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUser = async (request, response) => {
    try {
        const { token } = request.params;
        if (!token) {
            return response.status(400).json({
                status: `error`,
                message: `Resend verification link`
            });
        }
        const decode = jsonwebtoken_1.default.verify(token, `${process.env.APP_SECRET}`);
        const user = await userModel_1.default.findOne({ where: { id: decode.id } });
        if (!user) {
            return response.status(400).json({
                status: `error`,
                message: `User does not exist, Contact the admin`
            });
        }
        if (user.isVerified) {
            return response.status(400).json({
                status: `success`,
                message: `Account already verified`
            });
        }
        const updateUser = await userModel_1.default.update({ isVerified: true }, { where: { id: user.id } });
        if (updateUser[0] == 1) {
            const newUser = await userModel_1.default.findOne({ where: { id: decode.id } });
            return response.status(200).json({
                status: `success`,
                message: `Account successfully verified`,
                newUser
            });
        }
        return response.status(200).json({
            status: `error`,
            message: `Verification not successful`
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
exports.verifyUser = verifyUser;
