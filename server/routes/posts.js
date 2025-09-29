const { Router } = require("express");
const postValidation = require("../controllers/validation/postValidation");
const {
  createUserPost,
  getPosts,
  deleteUserPost,
} = require("../controllers/postsController");
const router = Router();

router.get("/", getPosts);
router.post("/user/create/post", postValidation(), createUserPost, getPosts);
router.delete("/delete/posts/:post_id", deleteUserPost);

module.exports = router;
