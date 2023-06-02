const { Router } = require("express");
const { adminLogin } = require("../controller/admin.js");

const router = Router();

router.post("/login", adminLogin);

module.exports = router;
