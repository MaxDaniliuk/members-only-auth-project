const { createHashedPassword } = require("../utils/password");
const userRepository = require("../repositories/userRepository");

exports.addNewUser = async (fullname, email, username, password) => {
  try {
    const hashedPassword = await createHashedPassword(password, 10);
    console.log("User created successfully.");
    return await userRepository.createUser(
      fullname,
      email,
      username,
      hashedPassword,
    );
  } catch (error) {
    throw new Error("User creation failed. Please try again later.");
  }
};

exports.promoteToMember = async (user) => {
  return await userRepository.updateMembershipStatus(user?.user_id);
};
