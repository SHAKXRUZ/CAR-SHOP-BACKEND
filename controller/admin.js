const { Users } = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token } = req.headers;

    console.log(token);

    let emailValidation =
      email.trim() === ""
        ? res.status(400).send({ msg: "Email kiriting?" })
        : email.trim();

    let passwordValidation =
      password.trim() === ""
        ? res.status(400).send({ msg: "Password kiriting?" })
        : password.trim();

    let userVerify = jwt.verify(token, process.env.SECRET_KEY);

    let adminUserObj = await Users.findOne({
      where: { email: userVerify.email },
    });

    if (adminUserObj.role !== process.env.ROLE) {
      return res.status(401).send({ msg: "You are not an admin?" });
    }

    if (adminUserObj.email !== emailValidation) {
      return res.status(404).send({ msg: "Email not found!" });
    }

    let userPassword = await bcrypt.compare(
      passwordValidation,
      adminUserObj.password
    );

    if (!userPassword) {
      return res.status(401).send({ msg: "Password error!" });
    }

    let adminTokenId = adminUserObj.id;
    let adminTokenUsername = adminUserObj.username;
    let adminTokenEmail = adminUserObj.email;
    let adminTokenPassword = adminUserObj.password;
    let adminTokenImages = adminUserObj.user_images;
    let adminTokenRole = adminUserObj.role;

    let admin_token = await jwt.sign(
      {
        id: adminTokenId,
        username: adminTokenUsername,
        email: adminTokenEmail,
        password: adminTokenPassword,
        user_images: adminTokenImages,
        role: adminTokenRole,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.JWT_TIME,
      }
    );

    res.status(201).send({ msg: "Success!", admin_token });
  } catch {
    res.send({ msg: "Error" });
  }
};

module.exports = {
  adminLogin,
};
