const { Router } = require("express");
const { getUser } = require("../controller/users.js");

const router = Router();

router.get("/list", getUser);

module.exports = router;
