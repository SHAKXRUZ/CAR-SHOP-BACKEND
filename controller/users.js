const { Users } = require("../model");
const bcrypt = require("bcryptjs");

// Users.sync({ force: false });

const getUsers = async (_, res) => {
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

module.exports = {
  getUsers,
  userRegistr,
};
