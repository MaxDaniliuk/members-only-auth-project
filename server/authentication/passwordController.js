const bcrypt = require("bcryptjs");

const createHashedPassword = async (password, saltLength) => {
  return await bcrypt.hash(password, saltLength);
};

const comaprePasswords = async (enteredPassword, storedPassword) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

module.exports = {
  createHashedPassword,
  comaprePasswords,
};
