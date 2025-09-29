const db = require("../db/queries");
const runMiddleware = require("./runMiddleware");
const fetchPosts = require("./postsAuthorizationController");

const createUserPost = async (req, res, next) => {
  try {
    const { topic, post } = req.body;
    const user_id = req.user.user_id;

    await db.createNewPost(user_id, topic, post);

    console.log("Post created successfully!");
    next();
  } catch (error) {
    console.error("Post submission failed: ", error.message);
    error.message = "Post submission failed. Please try again.";
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    await runMiddleware(req, res, fetchPosts);
    res.status(200).json(res.locals.postsResponse);
  } catch (error) {
    next(error);
  }
};

const deleteUserPost = async (req, res, next) => {
  try {
    if (!req.isAuthenticated() && !req.user.isadmin) {
      throw new Error("Access denied. User is not an admin.");
    }
    const { post_id } = req.params;
    await db.deleteUserPost(post_id);
    console.log(`Post ${post_id} has been deleted successfully!`);
    return res
      .status(200)
      .json({ message: `Post ${post_id} has been deleted successfully!` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUserPost,
  getPosts,
  deleteUserPost,
};
