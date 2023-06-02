const { Router } = require("express");
const { getUsers, userRegistr } = require("../controller/users.js");

const router = Router();

router.get("/list", getUsers);
router.post("/registr", userRegistr);

module.exports = router;
