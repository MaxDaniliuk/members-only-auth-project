const postRepository = require("../repositories/postRepository");

exports.getPostsBasedOnAuthStatus = async (isAuthenticated, isMember) => {
  let posts;
  let authorized;
  if (isAuthenticated && isMember) {
    posts = await postRepository.findPostsAuthorized();
    posts = posts.map((post) => ({
      post_id: post.post_id,
      title: post.title,
      post: post.post,
      created_at: post.created_at,
      username: post.user.username,
    }));
    authorized = true;
  } else {
    posts = await postRepository.findPostsUnauthorized();
    authorized = false;
  }
  return { authorized, posts };
};

exports.addNewPost = async (user_id, title, post) => {
  return await postRepository.createPost(user_id, title, post);
};

exports.deletePostById = async (post_id) => {
  return await postRepository.deletePost(post_id);
};
