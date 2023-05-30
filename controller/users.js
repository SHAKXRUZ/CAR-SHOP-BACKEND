const { User } = require("../model");

User.sync({ force: true });

const getUser = async (_, res) => {
  try {
    let user = await User.findAll();
    res.json(user);
  } catch {
    res.send({ msg: "Error" });
  }
};

module.exports = {
  getUser,
};
