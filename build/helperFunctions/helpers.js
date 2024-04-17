"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordTest = exports.convertToISODateString = exports.convertToDDMMYY = exports.generateToken = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcryptjs_1.default.genSalt(saltRounds);
    const hash = await bcryptjs_1.default.hash(password, salt);
    return hash;
};
exports.hashPassword = hashPassword;
const generateToken = (data) => {
    return jsonwebtoken_1.default.sign(data.data, `${process.env.APP_SECRET}`, { expiresIn: `${data.expires}` });
};
exports.generateToken = generateToken;
const convertToDDMMYY = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
};
exports.convertToDDMMYY = convertToDDMMYY;
const convertToISODateString = (regularDateString) => {
    const dateParts = regularDateString.split('/');
    if (dateParts.length === 3) {
        const day = dateParts[0].padStart(2, '0');
        const month = dateParts[1].padStart(2, '0');
        const year = dateParts[2];
        const date = new Date(`${year}-${month}-${day}`);
        if (!isNaN(date.getTime())) {
            return date.toISOString().slice(0, 10);
        }
    }
    return null;
};
exports.convertToISODateString = convertToISODateString;
const passwordTest = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?![\s!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]).{8,20}$/;
    const passwordTest = passwordRegex.test(password);
    return passwordTest ? true : false;
};
exports.passwordTest = passwordTest;
// export const handleDeleteCloudinaryAPIImageString = (imageLink:string) => {
//   const parts = imageLink.split("/");
//   const publicIdPart = parts.slice(-1)
//   const publicId = publicIdPart.join().split(".")[0]
//   return publicId;
// }
// export const getResourceTypeFromExtension = (imageUrl:string) => {
//   const extension = imageUrl.split('.').pop()?.toLowerCase();
//   switch (extension) {
//     case 'jpg':
//     case 'jpeg':
//     case 'png':
//     case 'gif':
//     case 'webp':
//     case 'avif':
//       return 'image';
//     case 'mp4':
//     case 'mov':
//     case 'wmv':
//       return 'video';
//     default:
//       return undefined;
//   }
// }
