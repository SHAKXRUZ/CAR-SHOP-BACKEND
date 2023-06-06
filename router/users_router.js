const { Router } = require("express");
const {
  getUsers,
  userRegistr,
  userLogin,
  getProfelImages,
  searchUser,
} = require("../controller/users.js");

const {
  carsShop,
  getBasket,
  basketCarsDelete,
} = require("../controller/basket.js");

const router = Router();

router.get("/list", getUsers);
router.post("/registr", userRegistr);
router.post("/login", userLogin);
router.get("/profel_images", getProfelImages);
router.get("/user_search_api", searchUser);

router.post("/cars_shop", carsShop);
router.get("/shop_list", getBasket);
router.delete("/shop_delete", basketCarsDelete);

module.exports = router;
