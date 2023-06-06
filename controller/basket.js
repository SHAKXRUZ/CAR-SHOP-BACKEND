const { Cars, Basket } = require("../model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// Basket.sync({ force: false });

const getBasket = async (req, res) => {
  try {
    const { token } = req.headers;

    let tokenVerify = jwt.verify(token, process.env.SECRET_KEY);

    let basketObj = await Basket.findAll({
      where: { user_id: tokenVerify.id },
    });

    res.json(basketObj);
  } catch {
    res.send({ msg: "Error" });
  }
};

const carsShop = async (req, res) => {
  try {
    const { id } = req.body;
    const { token } = req.headers;

    let tokenVerify = jwt.verify(token, process.env.SECRET_KEY);

    let carsObj = await Cars.findOne({
      where: { id: id },
    });

    if (carsObj) {
      await Basket.create({
        car_id: carsObj.id,
        img_url: carsObj.tur_img,
        name: carsObj.name,
        narxi: carsObj.cost,
        user_id: tokenVerify.id,
      });
    }

    return res.status(201).send({ msg: "Cars basket!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

const basketCarsDelete = async (req, res) => {
  try {
    const { id } = req.body;

    await Basket.destroy({
      returning: true,
      plain: true,
      where: {
        id: id,
      },
    });

    return res.status(201).send({ msg: "Cars shop deleted!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

module.exports = {
  carsShop,
  getBasket,
  basketCarsDelete,
};
