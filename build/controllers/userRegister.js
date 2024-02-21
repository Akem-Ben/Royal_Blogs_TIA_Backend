"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const helpers_1 = require("../helperFunctions/helpers");
const registerUser = async (request, response) => {
    try {
        const { fullName, userName, email, password, confirm_password } = request.body;
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
        const newPassword = (0, helpers_1.hashPassword)(password);
    }
    catch (error) {
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
        });
    }
};
exports.registerUser = registerUser;
