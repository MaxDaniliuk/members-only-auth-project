const { Router } = require("express");
const getAuthUser = require("../controllers/userAuthController");
const loginValidation = require("../controllers/validation/loginValidation");
const memberValidation = require("../controllers/validation/memberValidation");
const userLoginController = require("../controllers/userLoginController");
const userLogoutController = require("../controllers/userLogoutController");
const router = Router();

router.get("/auth/user", getAuthUser);
router.post("/auth/user/login", loginValidation(), userLoginController);
router.get("/auth/user/logout", userLogoutController);

module.exports = router;
