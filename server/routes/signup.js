const { Router } = require("express");
const signupUserPost = require("../controllers/userSignupController");
const signupValidation = require("../controllers/validation/signupValidation");
const router = Router();

router.post("/user/signup", signupValidation(), signupUserPost);

module.exports = router;
