const logoutUser = require("../authentication/logoutUser");

const getAuthUser = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ ...req.user });
  }
  return res.status(401).json(null);
};

const logoutAuthUser = (req, res, next) => {
  return logoutUser(req, res, next);
};

module.exports = {
  getAuthUser,
  logoutAuthUser,
};
