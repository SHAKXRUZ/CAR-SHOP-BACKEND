const { sequelize, DataTypes, UUIDV4 } = require("../config/db_config.js");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.TEXT,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user",
  },
});
module.exports = User;
