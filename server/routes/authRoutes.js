const { Router } = require("express");
const userController = require("../controllers/userController");
const loginValidation = require("../middlewares/validation/loginValidation");
const signupValidation = require("../middlewares/validation/signupValidation");
const memberValidation = require("../middlewares/validation/memberValidation");

const router = Router();

router.get("/", userController.checkAuthentication);
router.get("/logout", userController.logoutUser);
router.post("/login", loginValidation(), userController.loginUser);
router.post("/signup", signupValidation(), userController.signupUser);
router.patch("/member", memberValidation(), userController.promoteToMember);

module.exports = router;
