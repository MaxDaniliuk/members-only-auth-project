const { Router } = require("express");
const postValidation = require("../controllers/validation/postValidation");
const { createUserPost, getPosts } = require("../controllers/postsController");
const router = Router();

router.get("/", getPosts);
router.post("/user/create/post", postValidation(), createUserPost, getPosts);

module.exports = router;
