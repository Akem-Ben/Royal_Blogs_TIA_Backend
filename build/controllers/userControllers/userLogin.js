"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helpers_1 = require("../../helperFunctions/helpers");
const userLogin = async (request, response) => {
    try {
        const { loginKey, password } = request.body;
        let user;
        const checkUserName = (await userModel_1.default.findOne({
            where: { userName: loginKey },
        }));
        const checkEmail = (await userModel_1.default.findOne({
            where: { email: loginKey },
        }));
        if (checkEmail)
            user = checkEmail;
        if (checkUserName)
            user = checkUserName;
        if (!checkUserName && !checkEmail) {
            return response.status(404).json({
                status: `error`,
                message: `${loginKey} not found`,
            });
        }
        if (!user.isVerified) {
            return response.status(401).json({
                status: `error`,
                message: `Account not verified yet, only verified users can login`,
            });
        }
        const validate = await bcryptjs_1.default.compare(password, user.password);
        if (!validate) {
            return response.status(400).json({
                status: `error`,
                message: `Invalid Password`,
            });
        }
        const tokenData = {
            data: {
                id: user.id,
                email: user.email,
            },
            expires: "10h",
        };
        const token = (0, helpers_1.generateToken)(tokenData);
        const firstName = user.fullName.split(" ")[0];
        return response.status(200).json({
            message: `Welcome back ${firstName}`,
            token,
            user,
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
exports.userLogin = userLogin;
