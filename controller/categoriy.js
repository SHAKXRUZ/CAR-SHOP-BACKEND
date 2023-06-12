const { Categoriy } = require("../model");
const dotenv = require("dotenv");
dotenv.config();

Categoriy.sync({ force: false });

const getCategoriys = async (req, res) => {
  let categoriy = await Categoriy.findAll();
  res.json(categoriy);
};

const createCategoriy = async (req, res) => {
  try {
    const { title, categoriy_images } = req.body;

    let titleValidation =
      title.trim() === ""
        ? res.status(400).send({ msg: "Categoriy name kiriting?" })
        : title.trim().toLowerCase();

    let categoriyObj = await Categoriy.findOne({
      where: { title: titleValidation },
    });

    if (categoriyObj) {
      return res.status(401).send({
        msg: "You are categoriy!",
      });
    }

    await Categoriy.create({
      title: titleValidation,
      img_url: categoriy_images,
    });

    return res.status(201).send({ msg: "Create categoriy!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

const searchCategoriy = async (req, res) => {
  try {
    const { search } = req.headers;

    let searchToLowerCase = search.toLowerCase();

    let searchValidation = searchToLowerCase.trim();

    let objCategoriy = await Categoriy.findAll({
      where: { title: searchValidation },
    });

    return res.status(201).send(objCategoriy);
  } catch {
    res.send({ msg: "Error" });
  }
};

const updateCategoriy = async (req, res) => {
  try {
    const { id, title, img_url } = req.body;

    let titleValidation = title.trim().toLowerCase();
    if (!titleValidation && !img_url) {
      return res
        .status(401)
        .send({ msg: "You didn't add anything to the update?" });
    }

    let categoriyObj = await Categoriy.findOne({
      where: { id: id },
    });

    let catObjTitle = categoriyObj.title;
    let catObjImg_Url = categoriyObj.img_url;

    await Categoriy.update(
      {
        title: titleValidation ? titleValidation : catObjTitle,
        img_url: img_url ? img_url : catObjImg_Url,
      },
      {
        returning: true,
        where: {
          id,
        },
      }
    );

    return res.status(201).send({ msg: "Categoriy update!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

module.exports = {
  getCategoriys,
  createCategoriy,
  searchCategoriy,
  updateCategoriy,
};
