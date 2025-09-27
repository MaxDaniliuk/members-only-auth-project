const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    console.log("User logged out.");
    next();
  });
};

module.exports = logoutUser;
