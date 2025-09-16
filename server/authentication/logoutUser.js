const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    console.log("User logged out.");
    return res.status(200).json({
      errors: null,
      message: "User logged out.",
      user: null,
      logout: true,
    });
  });
};

module.exports = logoutUser;
