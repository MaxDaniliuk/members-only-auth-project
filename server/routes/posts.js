const { Router } = require("express");
const postValidation = require("../controllers/validation/postValidation");
const { createUserPost, postsGet } = require("../controllers/postsController");
const db = require("../db/queries");
const router = Router();

router.use(async (req, res, next) => {
  try {
    let posts;
    let authorized;
    if (req.isAuthenticated() && req.user.ismember) {
      posts = await db.selectPostsAuthorized();
      authorized = true;
    } else {
      posts = await db.selectPostsUnauthorized();
      authorized = false;
    }
    res.locals.postsResponse = { authorized, posts };
    next();
  } catch (error) {
    error.message = "Failed to fetch posts...";
    next(error);
  }
});

router.get("/", postsGet);
router.post("/user/create/post", postValidation(), createUserPost);

module.exports = router;
