const { Sequelize, DataTypes, UUIDV4 } = require("sequelize");
require("dotenv/config");

const sequelize = new Sequelize(process.env.URL);
sequelize
  .authenticate()
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

module.exports = {
  sequelize,
  UUIDV4,
  DataTypes,
};
