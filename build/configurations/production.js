"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { PROD_DB_PORT, PROD_DB_NAME, PROD_DB_USERNAME, PROD_DB_HOST, PROD_DB_PASSWORD, PROD_PORT } = process.env;
console.log('Running in production mode');
exports.default = {
    DB_PORT: PROD_DB_PORT,
    DB_NAME: PROD_DB_NAME,
    DB_USERNAME: PROD_DB_USERNAME,
    DB_HOST: PROD_DB_HOST,
    DB_PASSWORD: PROD_DB_PASSWORD,
    PORT: PROD_PORT
};
