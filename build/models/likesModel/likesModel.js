"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Likes = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Likes extends sequelize_1.Model {
}
exports.Likes = Likes;
Likes.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    ownerId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    postId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
}, {
    sequelize: index_1.database,
    tableName: "Likes",
});
exports.default = Likes;
