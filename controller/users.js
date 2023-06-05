const { Users } = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Users.sync({ force: false });

const getUsers = async (req, res) => {
  let users = await Users.findAll();
  res.json(users);
};

const userRegistr = async (req, res) => {
  try {
    const { username, email, password, registrImages } = req.body;

    let usernameValidation =
      username.trim() === ""
        ? res.status(400).send({ msg: "Username kiriting?" })
        : username.trim().toLowerCase();

    let emailValidation =
      email.trim() === ""
        ? res.status(400).send({ msg: "Email kiriting?" })
        : email.trim();

    let passwordValidation =
      password.trim() === ""
        ? res.status(400).send({ msg: "Password kiriting?" })
        : password.trim();

    let hashPassword = await bcrypt.hash(passwordValidation, 12);

    let userObj = await Users.findAll({
      where: { email: emailValidation },
    });

    if (userObj[0]) {
      return res.status(400).send({
        msg: "You are registered!",
      });
    }

    await Users.create({
      username: usernameValidation,
      email: emailValidation,
      password: hashPassword,
      user_images: registrImages,
    });

    return res.status(201).send({ msg: "You have registered!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let emailValidation =
      email.trim() === ""
        ? res.status(400).send({ msg: "Email kiriting?" })
        : email.trim();

    let passwordValidation =
      password.trim() === ""
        ? res.status(400).send({ msg: "Password kiriting?" })
        : password.trim();

    let userObj = await Users.findAll({
      where: { email: emailValidation },
    });

    if (!userObj[0]) {
      return res.status(404).send({ msg: "Email not found!" });
    }

    let hashPassword = userObj[0].password;

    let userPassword = await bcrypt.compare(passwordValidation, hashPassword);

    if (!userPassword) {
      return res.status(401).send({ msg: "Password error?" });
    }

    let user_id = userObj[0].id;
    let user_username = userObj[0].username;
    let user_email = userObj[0].email;
    let user_password = userObj[0].password;
    let userImages = userObj[0].user_images;
    let user_role = userObj[0].role;

    let token = await jwt.sign(
      {
        id: user_id,
        username: user_username,
        email: user_email,
        password: user_password,
        user_images: userImages,
        role: user_role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.JWT_TIME,
      }
    );

    res.status(201).send({ msg: "Success!", token });
  } catch {
    res.send({ msg: "Error" });
  }
};

const getProfelImages = async (req, res) => {
  try {
    const { token } = req.headers;

    let verifyTokenUserId = await jwt.verify(token, process.env.SECRET_KEY).id;

    let userObj = await Users.findOne({
      where: { id: verifyTokenUserId },
    });

    let userImagesUrl = userObj.user_images;

    return res.status(201).send({ userImagesUrl });
  } catch {
    res.send({ msg: "Error" });
  }
};

const searchUser = async (req, res) => {
  try {
    const { search } = req.headers;

    let searchToLowerCase = search.toLowerCase();

    let searchValidation = searchToLowerCase.trim();

    let objUsername = await Users.findAll({
      where: { username: searchValidation },
    });
    let objEmail = await Users.findAll({
      where: { email: searchValidation },
    });
    let objPassword = await Users.findAll({
      where: { password: searchValidation },
    });
    let objRole = await Users.findAll({
      where: { role: searchValidation },
    });
    if (!objUsername[0] && !objEmail[0] && !objPassword[0]) {
      return res.status(201).send(objRole);
    } else if (!objUsername[0] && !objEmail[0] && !objRole[0]) {
      return res.status(201).send(objPassword);
    } else if (!objUsername[0] && !objPassword[0] && !objRole[0]) {
      return res.status(201).send(objEmail);
    } else if (!objEmail[0] && !objPassword[0] && !objRole[0]) {
      return res.status(201).send(objUsername);
    } else if (
      !objEmail[0] &&
      !objPassword[0] &&
      objRole[0] &&
      objUsername[0]
    ) {
      return res.status(201).send(objUsername);
    }
  } catch {
    res.send({ msg: "Error" });
  }
};

module.exports = {
  getUsers,
  userRegistr,
  userLogin,
  getProfelImages,
  searchUser,
};
