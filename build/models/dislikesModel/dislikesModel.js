"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dislikes = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Dislikes extends sequelize_1.Model {
}
exports.Dislikes = Dislikes;
Dislikes.init({
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
    tableName: "Dislikes",
});
exports.default = Dislikes;
