const postService = require("../services/postService");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await postService.getPosts(
      req.isAuthenticated(),
      req.user?.ismember,
    );
    res.json({ posts });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  const { title, post } = req.body;
  const user_id = req.user.user_id;
  try {
    await postService.addNewPost(user_id, title, post);
    const message = "Post created successfully";
    res.json({ message });
  } catch (error) {
    error.message !== "Post submission failed. Please try again.";
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  const { post_id } = req.params;

  if (!req.isAuthenticated() && !req.user.isadmin) {
    const accessError = new Error("Access denied. Admins only.");
    next(accessError);
  }
  try {
    await postService.deletePostById(Number(post_id));
    const message = `Post ${post_id} has been deleted successfully!`;
    console.log(message);
    res.json({ message });
  } catch (error) {
    const postError = new Error(`Failed to delete the post ${post_id}`);
    next(postError);
  }
};
