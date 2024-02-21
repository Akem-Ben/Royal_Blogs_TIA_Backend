"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Comments extends sequelize_1.Model {
}
exports.Comments = Comments;
Comments.init({
    commentId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    postId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    ownerId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    commentText: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    likes: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    dislikes: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    sequelize: index_1.database,
    tableName: "Comments",
});
