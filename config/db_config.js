const { Sequelize, DataTypes, UUIDV4 } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize({
  user: process.env.DATABASE,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  dialect: process.env.DATABASE_DIALECT,
});
sequelize
  .authenticate()
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

module.exports = {
  sequelize,
  UUIDV4,
  DataTypes,
};
