"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationFunction = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel/userModel"));
const authorizationFunction = async (request, response, next) => {
    try {
        const authorization = request.headers.authorization;
        if (authorization === undefined) {
            return response.status(401).json({
                message: `You are not authorized to view this page, login please`,
            });
        }
        const token = authorization.split(" ");
        const mainToken = token[1];
        if (!mainToken || mainToken === "") {
            return response.status(401).json({
                status: `Failed`,
                message: `Login required`,
            });
        }
        const decode = jsonwebtoken_1.default.verify(mainToken, `${process.env.APP_SECRET}`);
        const user = await userModel_1.default.findOne({ where: { id: decode.id } });
        if (!user) {
            return response.status(400).json({
                status: `error`,
                message: `You are not allowed to access this resource. Login or contact the admin`
            });
        }
        request.user = decode;
        next();
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.authorizationFunction = authorizationFunction;
