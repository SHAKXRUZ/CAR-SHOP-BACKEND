const { Router } = require("express");
const {
  adminLogin,
  adminUserUpdate,
  adminUsersDelete,
} = require("../controller/admin.js");
const {
  getCategoriys,
  createCategoriy,
  searchCategoriy,
  updateCategoriy,
} = require("../controller/categoriy.js");

const router = Router();

router.post("/login", adminLogin);
router.get("/categoriy_list", getCategoriys);
router.post("/create_categoriy", createCategoriy);
router.get("/categoriy_search_api", searchCategoriy);
router.put("/update_categoriy", updateCategoriy);
router.put("/users_update", adminUserUpdate);
router.delete("/users_delete", adminUsersDelete);

module.exports = router;
