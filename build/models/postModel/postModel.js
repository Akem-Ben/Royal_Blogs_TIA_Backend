"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPost = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class BlogPost extends sequelize_1.Model {
}
exports.BlogPost = BlogPost;
BlogPost.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    postImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ownerId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    postText: {
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
    tableName: "BlogPost",
});
exports.default = BlogPost;
