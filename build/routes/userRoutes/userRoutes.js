"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRegister_1 = require("../../controllers/userControllers/userRegister");
const upload_1 = require("../../utilities/upload");
const verifyUser_1 = require("../../controllers/userControllers/verifyUser");
const router = express_1.default.Router();
router.post("/signup", upload_1.upload.single("profileImage"), userRegister_1.registerUser);
router.post("/verify/:token", verifyUser_1.verifyUser);
exports.default = router;
