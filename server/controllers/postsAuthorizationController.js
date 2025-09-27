const db = require("../db/queries");

async function fetchPosts(req, res, next) {
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
}

module.exports = fetchPosts;
