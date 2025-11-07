const { createHashedPassword } = require("../utils/password");
const userRepository = require("../repositories/userRepository");
const postService = require("../services/postService");

exports.addNewUser = async (fullname, email, username, password) => {
  try {
    const hashedPassword = await createHashedPassword(password, 10);
    await userRepository.createUser(fullname, email, username, hashedPassword);
  } catch (error) {
    throw new Error("User creation failed. Please try again later.");
  }
  console.log("User created successfully.");
};

exports.getDashboardData = async (isAuthenticated, user) => {
  const { authorized, posts } = await postService.getPostsBasedOnAuthStatus(
    isAuthenticated,
    user?.ismember,
  );
  return {
    message: isAuthenticated ? "User logged in." : "User logged out.",
    user: isAuthenticated ? user : null,
    logout: !isAuthenticated,
    postsResponse: { authorized, posts },
  };
};

exports.promoteToMember = async (isAuthenticated, user) => {
  await userRepository.updateMembershipStatus(user?.user_id);
  
  if (user) {
    user.ismember = true;
  }

  const { authorized, posts } = await postService.getPostsBasedOnAuthStatus(
    isAuthenticated,
    user?.ismember,
  );

  return {
    message: "Member status set to true.",
    user: user,
    postsResponse: { authorized, posts },
  };
};
