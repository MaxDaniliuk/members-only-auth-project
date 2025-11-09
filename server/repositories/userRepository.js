const { user } = require("../db/prisma");

const findUser = async (field, value) => {
  return user.findUnique({
    where: {
      [field]: value,
    },
  });
};

const createUser = async (fullname, email, username, hashedPassword) => {
  return user.create({
    data: {
      fullname,
      email,
      username,
      password: hashedPassword,
    },
  });
};

const updateMembershipStatus = async (user_id) => {
  return user.update({
    where: {
      user_id,
    },
    data: {
      ismember: true,
    },
  });
};

module.exports = {
  findUser,
  createUser,
  updateMembershipStatus,
};
