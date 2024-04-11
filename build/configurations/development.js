"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DEV_DB_PORT, DB_NAME, DB_USERNAME, DB_HOST, DB_PASSWORD, DEV_PORT } = process.env;
console.log('Running in development mode');
exports.default = {
    DB_PORT: DEV_DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_HOST,
    DB_PASSWORD,
    PORT: DEV_PORT
};
