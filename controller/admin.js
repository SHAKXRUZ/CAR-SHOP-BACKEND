const { Users } = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token } = req.headers;

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

    if (
      adminUserObj.role !== process.env.ROLE &&
      adminUserObj.role !== process.env.BIG_ADMIN
    ) {
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

const adminUserUpdate = async (req, res) => {
  try {
    const { id, username, email, password, role, user_images } = req.body;
    const { admin_token } = req.headers;

    let tokenVerify = jwt.verify(admin_token, process.env.SECRET_KEY);

    let usernameValidation = username.trim().toLowerCase();
    let emailValidation = email.trim().toLowerCase();
    let passwordValidation = password.trim().toLowerCase();
    let roleValidation = role.trim().toLowerCase();

    let usersObj = await Users.findOne({
      where: { id: id },
    });

    if (
      !usernameValidation &&
      !emailValidation &&
      !passwordValidation &&
      !roleValidation &&
      !user_images
    ) {
      return res.status(401).send({ msg: "You didn't edit anything?" });
    }

    if (tokenVerify.role === process.env.ROLE && roleValidation) {
      return res.status(401).send({ msg: "You can't change user roles?" });
    }

    if (
      tokenVerify.role === process.env.BIG_ADMIN &&
      roleValidation &&
      tokenVerify.id === usersObj.id
    ) {
      return res.status(401).send({ msg: "Can't you change your role?" });
    }

    if (
      tokenVerify.role === process.env.ROLE &&
      usersObj.role === process.env.BIG_ADMIN
    ) {
      return res
        .status(401)
        .send({ msg: "You can't change the details of a senior admin?" });
    }

    if (
      usersObj.id !== tokenVerify.id &&
      tokenVerify.role === process.env.ROLE &&
      usersObj.role === process.env.ROLE
    ) {
      return res
        .status(401)
        .send({ msg: "You can't change the data of other admins?" });
    }

    if (
      (usersObj.id === tokenVerify.id &&
        tokenVerify.role === process.env.ROLE) ||
      usersObj.role === "user"
    ) {
      await Users.update(
        {
          username: usernameValidation ? usernameValidation : usersObj.username,
          email: emailValidation ? emailValidation : usersObj.email,
          password: passwordValidation ? passwordValidation : usersObj.password,
          user_images: user_images ? user_images : usersObj.user_images,
        },
        {
          returning: true,
          where: {
            id,
          },
        }
      );
    }

    await Users.update(
      {
        username: usernameValidation ? usernameValidation : usersObj.username,
        email: emailValidation ? emailValidation : usersObj.email,
        password: passwordValidation ? passwordValidation : usersObj.password,
        user_images: user_images ? user_images : usersObj.user_images,
        role: roleValidation ? roleValidation : usersObj.role,
      },
      {
        returning: true,
        where: {
          id,
        },
      }
    );

    return res.status(201).send({ msg: "User update!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

const adminUsersDelete = async (req, res) => {
  try {
    const { id } = req.body;
    const { admin_token } = req.headers;

    let tokenVerify = jwt.verify(admin_token, process.env.SECRET_KEY);

    let usersObj = await Users.findOne({
      where: { id: id },
    });

    let tokenVerifyRole = tokenVerify.role;
    let usersObjRole = usersObj.role;

    if (usersObjRole === process.env.BIG_ADMIN) {
      return res.status(401).send({ msg: "You can't remove senior admin?" });
    } else if (
      tokenVerifyRole !== process.env.BIG_ADMIN &&
      usersObjRole === process.env.ROLE
    ) {
      return res.status(401).send({ msg: "You can't delete other admins?" });
    } else if (
      tokenVerifyRole === process.env.ROLE &&
      usersObjRole === "user"
    ) {
      await Users.destroy({
        returning: true,
        plain: true,
        where: {
          id,
        },
      });
    } else if (
      tokenVerifyRole === process.env.BIG_ADMIN &&
      usersObjRole !== process.env.BIG_ADMIN
    ) {
      await Users.destroy({
        returning: true,
        plain: true,
        where: {
          id,
        },
      });
    }

    return res.status(201).send({ msg: "User deleted!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

module.exports = {
  adminLogin,
  adminUserUpdate,
  adminUsersDelete,
};
