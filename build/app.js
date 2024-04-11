"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const configurations_1 = require("./configurations");
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes/postRoutes"));
const config_1 = __importDefault(require("./configurations/config"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use('/users', userRoutes_1.default);
app.use('/post', postRoutes_1.default);
configurations_1.database.sync({}).then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log(err);
});
app.listen(config_1.default.PORT, () => {
    console.log(`server running on Port ${config_1.default.PORT}`);
});
