const passport = require("passport");
const userService = require("../services/userService");

function loginUserAfterSigningUp(req, res, next) {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return reject(err);
      if (!user) return reject({ status: 400, info });

      req.login(user, (err) => {
        if (err) return reject(err);
        console.log("User logged in signing up.");
        resolve(user);
      });
    })(req, res, next);
  });
}

exports.loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user)
      return res.status(400).json({ errors: info, message: null, user: null });

    req.login(user, (err) => {
      if (err) return next(err);

      console.log("User logged in.");
      return res.json({ user: req.user });
    });
  })(req, res, next);
};

exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    console.log("User logged out.");
    return res.json({
      logout: true,
      user: null,
    });
  });
};

exports.signupUser = async (req, res, next) => {
  const { fullname, email, username, password } = req.body;
  try {
    await userService.addNewUser(fullname, email, username, password);
    const user = await loginUserAfterSigningUp(req, res, next);
    res.json({
      message: "User created and logged in.",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.checkAuthentication = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ ...req.user });
  }
  return res.status(401).json(null);
};

exports.promoteToMember = async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      throw new Error("Not authenticated. Access denied.");
    }
    await userService.promoteToMember(req.user);
    req.user.ismember = true;
    console.log("Member status changed: ", req.user);
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
};
