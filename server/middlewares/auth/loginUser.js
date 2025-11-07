const passport = require("passport");

const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user)
      return res.status(400).json({ errors: info, message: null, user: null });

    req.login(user, (err) => {
      if (err) return next(err);

      console.log("User logged in.");
      next();
    });
  })(req, res, next);
};

module.exports = loginUser;
