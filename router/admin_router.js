const { Router } = require("express");
const {
  adminLogin,
  adminUserUpdate,
  adminUsersDelete,
  adminCategoriyDelete,
  adminCarsDelete,
} = require("../controller/admin.js");
const {
  getCategoriys,
  createCategoriy,
  searchCategoriy,
  updateCategoriy,
} = require("../controller/categoriy.js");

const {
  getUsers,
  createCars,
  searchCars,
  updateCars,
} = require("../controller/cars.js");

const router = Router();

router.post("/login", adminLogin);
router.get("/categoriy_list", getCategoriys);
router.post("/create_categoriy", createCategoriy);
router.get("/categoriy_search_api", searchCategoriy);
router.put("/update_categoriy", updateCategoriy);
router.put("/update_cars", updateCars);
router.put("/users_update", adminUserUpdate);
router.delete("/users_delete", adminUsersDelete);
router.get("/cars_list", getUsers);
router.post("/create_cars", createCars);
router.get("/cars_search_api", searchCars);
router.delete("/categoriy_delete", adminCategoriyDelete);
router.delete("/cars_delete", adminCarsDelete);

module.exports = router;
