const { Router } = require("express");
const postValidation = require("../controllers/validation/postValidation");
const { createUserPost } = require("../controllers/postsController");
const router = Router();

router.post("/user/create/post", postValidation(), createUserPost);

module.exports = router;
