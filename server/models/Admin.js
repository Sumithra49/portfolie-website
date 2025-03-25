const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Admin = sequelize.define(
  "Admin",
  {
    username: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true, // Prevent Sequelize from pluralizing table name
    tableName: "Admin", // Exact table name in DB
  }
);

module.exports = Admin;
