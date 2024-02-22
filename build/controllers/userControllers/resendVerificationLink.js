"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendUserVerification = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const helpers_1 = require("../../helperFunctions/helpers");
const notification_1 = require("../../utilities/notification");
const resendUserVerification = async (request, response) => {
    try {
        const { loginKey } = request.body;
        let user;
        const findUserByEmail = await userModel_1.default.findOne({ where: { email: loginKey } });
        if (findUserByEmail)
            user = findUserByEmail;
        const findUserByUserName = await userModel_1.default.findOne({ where: { userName: loginKey } });
        if (findUserByUserName)
            user = findUserByUserName;
        if (!findUserByEmail && !findUserByUserName) {
            return response.status(401).json({
                status: `error`,
                message: `User does not exist, please check username/email or register`
            });
        }
        const tokenData = {
            data: {
                id: user.id,
                email: user.email
            },
            expires: '10min'
        };
        const token = (0, helpers_1.generateToken)(tokenData);
        await (0, notification_1.sendMail)(user.email, token);
        return response.status(200).json({
            status: `success`,
            message: `Verification successfully sent, please check your email`
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
exports.resendUserVerification = resendUserVerification;
