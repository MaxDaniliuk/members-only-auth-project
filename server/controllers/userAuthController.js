const authUserGet = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ ...req.user });
  }
  return res.status(401).json(null);
};

module.exports = authUserGet;
