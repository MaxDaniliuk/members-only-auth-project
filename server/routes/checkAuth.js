const { Router } = require("express");
const authUserGet = require("../controllers/userAuthController");
const router = Router();

router.get("/auth/user", authUserGet);

module.exports = router;
