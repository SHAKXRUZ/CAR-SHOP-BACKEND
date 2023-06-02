const { Router } = require("express");
const {
  getUsers,
  userRegistr,
  userLogin,
  getProfelImages,
} = require("../controller/users.js");

const router = Router();

router.get("/list", getUsers);
router.post("/registr", userRegistr);
router.post("/login", userLogin);
router.get("/profel_images", getProfelImages);

module.exports = router;
