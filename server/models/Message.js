const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Message = sequelize.define(
  "Message",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT },
  },
  {
    freezeTableName: true, // Prevent Sequelize from pluralizing table name
    tableName: "Message", // Exact table name in DB
  }
);

module.exports = Message;
