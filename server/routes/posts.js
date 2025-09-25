const { Router } = require("express");
const postValidation = require("../controllers/validation/postValidation");
const {
  createUserPost,
  fetchPosts,
  postsGet,
} = require("../controllers/postsController");
const router = Router();

router.get("/", fetchPosts, postsGet);
router.post(
  "/user/create/post",
  postValidation(),
  createUserPost,
  fetchPosts,
  postsGet,
);

module.exports = router;
