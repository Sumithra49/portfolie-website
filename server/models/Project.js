const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Project = sequelize.define(
  "Project",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    technologies: { type: DataTypes.STRING },
    githubLink: { type: DataTypes.STRING },
    liveDemo: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    tableName: "Project",
  }
);

module.exports = Project;
