const prisma = require("../db/prisma");

async function fetchPosts(req, res, next) {
  try {
    let posts;
    let authorized;
    if (req.isAuthenticated() && req.user.ismember) {
      posts = await prisma.findPostsAuthorized();
      posts = posts.map((post) => ({
        post_id: post.post_id,
        title: post.title,
        post: post.post,
        created_at: post.created_at,
        username: post.user.username,
      }));
      authorized = true;
    } else {
      posts = await prisma.findPostsUnauthorized();
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
