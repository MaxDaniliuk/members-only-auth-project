const postRepository = require("../repositories/postRepository");

exports.addNewPost = async (user_id, title, post) => {
  return await postRepository.createPost(user_id, title, post);
};

exports.deletePostById = async (post_id) => {
  return await postRepository.deletePost(post_id);
};

exports.getPosts = async (isAuthenticated, isMember) => {
  if (!isAuthenticated && !isMember) {
    const posts = await postRepository.findPostsUnauthorized();
    return posts;
  }

  const rawPosts = await postRepository.findPostsAuthorized();
  const formattedPosts = rawPosts.map((post) => ({
    post_id: post.post_id,
    title: post.title,
    post: post.post,
    created_at: post.created_at,
    username: post.user.username,
  }));
  return formattedPosts;
};
