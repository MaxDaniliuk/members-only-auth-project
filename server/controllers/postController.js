const postService = require("../services/postService");

exports.getPosts = async (req, res, next) => {
  try {
    const data = await postService.getPostsBasedOnAuthStatus(
      req.isAuthenticated(),
      req.user?.ismember,
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, post } = req.body;
    const user_id = req.user.user_id;

    try {
      await postService.addNewPost(user_id, title, post);
    } catch (err) {
      throw new Error("Post submission failed. Please try again.");
    }
    const data = await postService.getPostsBasedOnAuthStatus(
      req.isAuthenticated(),
      req.user?.ismember,
    );
    res.json(data);
  } catch (error) {
    if (error.message !== "Post submission failed. Please try again.") {
      error.message = "Failed to fetch posts."
    }   
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    if (!req.isAuthenticated() && !req.user.isadmin) {
      throw new Error("Access denied. Admins only.");
    }
    const { post_id } = req.params;
    await postService.deletePostById(Number(post_id));
    console.log(`Post ${post_id} has been deleted successfully!`);
    res.json({ message: `Post ${post_id} has been deleted successfully!` });
  } catch (error) {
    if (error.message !== "Access denied. Admins only."); {
      error.message = `Failed to delete the post ${post_id}`;
    }
    next(error);
  }
};