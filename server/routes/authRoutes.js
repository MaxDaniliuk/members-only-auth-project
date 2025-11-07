const { Router } = require("express");
const userController = require("../controllers/userController");
const loginValidation = require("../middlewares/validation/loginValidation");
const memberValidation = require("../middlewares/validation/memberValidation");
const loginUser = require("../middlewares/auth/loginUser");
const logoutUser = require("../middlewares/auth/logoutUser");

const router = Router();

router.get("/", userController.checkAuthentication);
router.get("/logout", logoutUser, userController.getDashboard);
router.post(
  "/login",
  loginValidation(),
  loginUser,
  userController.getDashboard,
);
router.patch("/member", memberValidation(), userController.authorizeUser);

module.exports = router;
