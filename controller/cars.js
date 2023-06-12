const { Cars, Categoriy } = require("../model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

Cars.sync({ force: false });

const getUsers = async (req, res) => {
  let cars = await Cars.findAll();
  res.json(cars);
};

const createCars = async (req, res) => {
  try {
    const {
      markasi,
      tanirovkasi,
      matori,
      yili,
      rangi,
      yurgani,
      gearbooki,
      narxi,
      name,
      deseriptioni,
      ichki_makon,
      tashqi_makon,
      cars_turi,
    } = req.body;

    let markasiValidation = markasi.trim().toLowerCase();

    let tanirovkasiValidation = tanirovkasi.trim().toLowerCase();

    let matoriValidation =
      matori.trim() === ""
        ? res.status(400).send({ msg: "Matorini kiriting?" })
        : matori.trim().toLowerCase();

    let yiliValidation =
      yili.trim() === ""
        ? res.status(400).send({ msg: "Yilini kiriting?" })
        : yili.trim().toLowerCase();

    let rangiValidation =
      rangi.trim() === ""
        ? res.status(400).send({ msg: "Colorini kiriting?" })
        : rangi.trim().toLowerCase();

    let yurganiValidation =
      yurgani.trim() === ""
        ? res.status(400).send({ msg: "Distance kiriting?" })
        : yurgani.trim().toLowerCase();

    let gearbookiValidation =
      gearbooki.trim() === ""
        ? res.status(400).send({ msg: "Gearbookini kiriting?" })
        : gearbooki.trim().toLowerCase();

    let narxiValidation =
      narxi.trim() === ""
        ? res.status(400).send({ msg: "Narxini kiriting?" })
        : narxi.trim().toLowerCase();

    let nameValidation =
      name.trim() === ""
        ? res.status(400).send({ msg: "Name kiriting?" })
        : name.trim().toLowerCase();

    let deseriptioniValidation =
      deseriptioni.trim() === ""
        ? res.status(400).send({ msg: "Deseription kiriting?" })
        : deseriptioni.trim().toLowerCase();

    let categoriyObj = await Categoriy.findOne({
      where: { title: markasiValidation },
    });

    let categoriyId = categoriyObj.id;

    let carsObj = await Cars.findOne({
      where: { name: nameValidation },
    });

    if (carsObj) {
      return res.status(401).send({ msg: "Is there a car with that name?" });
    }

    await Cars.create({
      categoriy_id: categoriyId,
      tanning: tanirovkasiValidation,
      motor: matoriValidation,
      year: yiliValidation,
      color: rangiValidation,
      walking: yurganiValidation,
      gearbook: gearbookiValidation,
      cost: narxiValidation,
      name: nameValidation,
      description: deseriptioniValidation,
      ichki_makon: ichki_makon,
      tashqi_makon: tashqi_makon,
      tur_img: cars_turi,
    });

    return res.status(201).send({ msg: "Create cars!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

const searchCars = async (req, res) => {
  try {
    const { search } = req.headers;

    let searchToLowerCase = search.toLowerCase();

    let searchValidation = searchToLowerCase.trim();

    let objTanirovkasi = await Cars.findAll({
      where: { tanning: searchValidation },
    });

    let objMotori = await Cars.findAll({
      where: { motor: searchValidation },
    });

    let objYili = await Cars.findAll({
      where: { year: searchValidation },
    });

    let objRangi = await Cars.findAll({
      where: { color: searchValidation },
    });

    let objYurgani = await Cars.findAll({
      where: { walking: searchValidation },
    });

    let objGearbooki = await Cars.findAll({
      where: { gearbook: searchValidation },
    });

    let objNarxi = await Cars.findAll({
      where: { cost: searchValidation },
    });

    let objName = await Cars.findAll({
      where: { name: searchValidation },
    });

    if (
      !objMotori[0] &&
      !objYili[0] &&
      !objRangi[0] &&
      !objYurgani[0] &&
      !objGearbooki[0] &&
      !objNarxi[0] &&
      !objName[0]
    ) {
      return res.status(201).send(objTanirovkasi);
    } else if (
      !objTanirovkasi[0] &&
      !objYili[0] &&
      !objRangi[0] &&
      !objYurgani[0] &&
      !objGearbooki[0] &&
      !objNarxi[0] &&
      !objName[0]
    ) {
      return res.status(201).send(objMotori);
    } else if (
      !objTanirovkasi[0] &&
      !objMotori[0] &&
      !objRangi[0] &&
      !objYurgani[0] &&
      !objGearbooki[0] &&
      !objNarxi[0] &&
      !objName[0]
    ) {
      return res.status(201).send(objYili);
    } else if (
      !objTanirovkasi[0] &&
      !objMotori[0] &&
      !objYili[0] &&
      !objYurgani[0] &&
      !objGearbooki[0] &&
      !objNarxi[0] &&
      !objName[0]
    ) {
      return res.status(201).send(objRangi);
    } else if (
      !objTanirovkasi[0] &&
      !objMotori[0] &&
      !objYili[0] &&
      !objRangi[0] &&
      !objGearbooki[0] &&
      !objNarxi[0] &&
      !objName[0]
    ) {
      return res.status(201).send(objYurgani);
    } else if (
      !objTanirovkasi[0] &&
      !objMotori[0] &&
      !objYili[0] &&
      !objRangi[0] &&
      !objYurgani[0] &&
      !objNarxi[0] &&
      !objName[0]
    ) {
      return res.status(201).send(objGearbooki);
    } else if (
      !objTanirovkasi[0] &&
      !objMotori[0] &&
      !objYili[0] &&
      !objRangi[0] &&
      !objYurgani[0] &&
      !objGearbooki[0] &&
      !objName[0]
    ) {
      return res.status(201).send(objNarxi);
    } else if (
      !objTanirovkasi[0] &&
      !objMotori[0] &&
      !objYili[0] &&
      !objRangi[0] &&
      !objYurgani[0] &&
      !objGearbooki[0] &&
      !objNarxi[0]
    ) {
      return res.status(201).send(objName);
    }
  } catch {
    res.send({ msg: "Error" });
  }
};

const updateCars = async (req, res) => {
  try {
    const {
      id,
      markasi,
      tanirovkasi,
      matori,
      yili,
      rangi,
      yurgani,
      gearbooki,
      narxi,
      name,
      deseriptioni,
      ichki_makon,
      tashqi_makon,
      cars_turi,
    } = req.body;

    let markasiValidation = markasi.trim().toLowerCase();

    let tanirovkasiValidation = tanirovkasi.trim().toLowerCase();

    let matoriValidation = matori.trim().toLowerCase();

    let yiliValidation = yili.trim().toLowerCase();

    let rangiValidation = rangi.trim().toLowerCase();

    let yurganiValidation = yurgani.trim().toLowerCase();

    let gearbookiValidation = gearbooki.trim().toLowerCase();

    let narxiValidation = narxi.trim().toLowerCase();

    let nameValidation = name.trim().toLowerCase();

    let deseriptioniValidation = deseriptioni.trim().toLowerCase();

    if (
      !markasiValidation &&
      !tanirovkasiValidation &&
      !matoriValidation &&
      !yiliValidation &&
      !rangiValidation &&
      !yurganiValidation &&
      !gearbookiValidation &&
      !narxiValidation &&
      !nameValidation &&
      !deseriptioniValidation &&
      !ichki_makon &&
      !tashqi_makon &&
      !cars_turi
    ) {
      return res.status(401).send({ msg: "You didn't edit anything?" });
    }

    let carsObj = await Cars.findOne({
      where: { id: id },
    });

    let categoriyObj = await Categoriy.findOne({
      where: { title: markasiValidation },
    });

    await Cars.update(
      {
        categoriy_id: categoriyObj.id ? categoriyObj.id : carsObj.categoriy_id,
        tanning: tanirovkasiValidation
          ? tanirovkasiValidation
          : carsObj.tanning,
        motor: matoriValidation ? matoriValidation : carsObj.motor,
        year: yiliValidation ? yiliValidation : carsObj.year,
        color: rangiValidation ? rangiValidation : carsObj.color,
        walking: yurganiValidation ? yurganiValidation : carsObj.walking,
        gearbook: gearbookiValidation ? gearbookiValidation : carsObj.gearbook,
        cost: narxiValidation ? narxiValidation : carsObj.cost,
        name: nameValidation ? nameValidation : carsObj.name,
        description: deseriptioniValidation
          ? deseriptioniValidation
          : carsObj.description,
        ichki_makon: ichki_makon ? ichki_makon : carsObj.ichki_makon,
        tashqi_makon: tashqi_makon ? tashqi_makon : carsObj.tashqi_makon,
        tur_img: cars_turi ? cars_turi : carsObj.tur_img,
      },
      {
        returning: true,
        where: {
          id,
        },
      }
    );

    return res.status(201).send({ msg: "Cars update!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

module.exports = {
  getUsers,
  createCars,
  searchCars,
  updateCars,
};
