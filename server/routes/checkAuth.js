const { Router } = require("express");
const {
  getAuthUser,
  logoutAuthUser,
} = require("../controllers/userAuthController");
const loginValidation = require("../controllers/validation/loginValidation");
const loginUserPost = require("../controllers/userLoginController");
const router = Router();

router.get("/auth/user", getAuthUser);
router.post("/auth/user/login", loginValidation(), loginUserPost);
router.get("/auth/user/logout", logoutAuthUser);

module.exports = router;
