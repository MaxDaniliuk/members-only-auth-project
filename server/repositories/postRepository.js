const { post } = require("../db/prisma");

const createPost = async (user_id, title, postContent) => {
  return post.create({
    data: {
      user_id,
      title,
      post: postContent,
    },
  });
};

const findPostsAuthorized = async () => {
  return post.findMany({
    select: {
      post_id: true,
      title: true,
      post: true,
      created_at: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const findPostsUnauthorized = async () => {
  return post.findMany({
    select: {
      post_id: true,
      title: true,
      post: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const deletePost = async (post_id) => {
  return post.delete({
    where: {
      post_id,
    },
  });
};

module.exports = {
  createPost,
  findPostsAuthorized,
  findPostsUnauthorized,
  deletePost,
};
