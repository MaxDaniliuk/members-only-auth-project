const { Router } = require("express");
const postController = require("../controllers/postController");
const postValidation = require("../middlewares/validation/postValidation");

const router = Router();

router.get("/", postController.getPosts);
router.post("/post", postValidation(), postController.createPost);
router.delete("/posts/:post_id", postController.deletePost);

module.exports = router;