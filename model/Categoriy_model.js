const { sequelize, DataTypes, UUIDV4 } = require("../config/db_config.js");

const Categoriy = sequelize.define("categoriy", {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Categoriy;
