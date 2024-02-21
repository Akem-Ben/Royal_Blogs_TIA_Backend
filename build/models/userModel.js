"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.user_type = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
var user_type;
(function (user_type) {
    user_type["LECTURER"] = "Lecturer";
    user_type["USER"] = "Student";
})(user_type || (exports.user_type = user_type = {}));
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_type: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(user_type)),
        allowNull: false,
    },
    faculty_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    department_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    userID_no: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required",
            },
            notEmpty: {
                msg: "Password is required",
            },
        },
    },
}, {
    sequelize: index_1.database,
    tableName: "User",
});
exports.default = User;
