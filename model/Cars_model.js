const { sequelize, DataTypes, UUIDV4 } = require("../config/db_config.js");

const Cars = sequelize.define("cars", {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  categoriy_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanning: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  walking: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gearbook: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cost: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  ichki_makon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tashqi_makon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tur_img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Cars;
