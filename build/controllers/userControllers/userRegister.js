"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const helpers_1 = require("../../helperFunctions/helpers");
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const uuid_1 = require("uuid");
const notification_1 = require("../../utilities/notification");
const registerUser = async (request, response) => {
    try {
        const { fullName, userName, email, password, confirm_password } = request.body;
        const checkUser = await userModel_1.default.findOne({ where: { email } });
        if (checkUser) {
            return response.status(400).json({
                status: `error`,
                message: `this email already exists, proceed to login`
            });
        }
        if (!(0, helpers_1.passwordTest)(password)) {
            return response.status(400).json({
                status: `error`,
                message: `Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.`,
            });
        }
        if (password !== confirm_password) {
            return response.status(400).json({
                status: `error`,
                message: `password mismatch`,
            });
        }
        const newPassword = await (0, helpers_1.hashPassword)(password);
        const newUser = await userModel_1.default.create({
            id: (0, uuid_1.v4)(),
            profileImage: request.file.path,
            fullName,
            userName,
            email,
            password: newPassword,
            isVerified: false
        });
        const findUser = await userModel_1.default.findOne({ where: { email } });
        if (!findUser) {
            return response.status(400).json({
                status: `error`,
                message: `Unable to register user, contact admin`
            });
        }
        const tokenData = {
            data: {
                id: findUser.id,
                email: findUser.email
            },
            expires: '10min'
        };
        const token = (0, helpers_1.generateToken)(tokenData);
        await (0, notification_1.sendMail)(email, token);
        return response.status(200).json({
            status: `success`,
            message: `User registered successfully`,
            findUser
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
exports.registerUser = registerUser;
