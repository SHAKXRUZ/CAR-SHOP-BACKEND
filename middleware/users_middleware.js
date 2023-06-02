const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { Users } = require("../model");

const middleware = async (req, res, next) => {
  try {
    if (req.url === "/users/registr" || req.url === "/users/login") {
      return next();
    }

    const { token } = req.headers;
    let userId = jwt.verify(token, process.env.SECRET_KEY);

    await Users.findOne({ where: { id: userId.id } });

    next();
  } catch (error) {
    res.status(401).send({
      msg: "Token not available?",
    });
  }
};

module.exports = middleware;
