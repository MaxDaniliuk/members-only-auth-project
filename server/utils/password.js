const bcrypt = require("bcryptjs");

const createHashedPassword = async (password, saltLength) => {
  return await bcrypt.hash(password, saltLength);
};

const comparePasswords = async (enteredPassword, storedPassword) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

module.exports = {
  createHashedPassword,
  comparePasswords,
};
