const { DataTypes } = require("sequelize");
const db = require("../db");

const Forum = db.define("forum", {
    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    comment: {
        type: DataTypes.STRING
    }
});

module.exports = Forum;