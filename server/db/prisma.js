const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function findUser(field, value) {
  return prisma.user.findUnique({
    where: {
      [field]: value,
    },
  });
}

async function createUser(fullname, email, username, hashedPassword) {
  return prisma.user.create({
    data: {
      fullname,
      email,
      username,
      password: hashedPassword,
    },
  });
}

async function createPost(user_id, title, post) {
  return prisma.post.create({
    data: {
      user_id,
      title,
      post,
    },
  });
}

async function findPostsAuthorized() {
  return prisma.post.findMany({
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
}

async function findPostsUnauthorized() {
  return prisma.post.findMany({
    select: {
      post_id: true,
      title: true,
      post: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

async function updateMembershipStatus(user_id) {
  return prisma.user.update({
    where: {
      user_id,
    },
    data: {
      ismember: true,
    },
  });
}

async function deletePost(post_id) {
  return prisma.post.delete({
    where: {
      post_id,
    },
  });
}

module.exports = {
  findUser,
  createUser,
  createPost,
  findPostsAuthorized,
  findPostsUnauthorized,
  updateMembershipStatus,
  deletePost,
};
