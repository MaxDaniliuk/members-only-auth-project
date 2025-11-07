const { Router } = require("express");
const userController = require("../controllers/userController");
const signupValidation = require("../middlewares/validation/signupValidation");
const router = Router();

router.post("/signup", signupValidation(), userController.signupUser);

module.exports = router;
