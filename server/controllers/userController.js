const userService = require("../services/userService");
const useMiddleware = require("../utils/useMiddleware");
const loginUser = require("../middlewares/auth/loginUser");

exports.signupUser = async (req, res, next) => {
  const { fullname, email, username, password, confirmPassword } = req.body;
  try {
    await userService.addNewUser(fullname, email, username, password);
    await useMiddleware(req, res, loginUser);
    res.json({
      errors: null,
      message: "User created and logged in.",
      user: req.user,
      postsResponse: res.locals.postsResponse,
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

exports.getDashboard = async (req, res, next) => {
  try {
    const data = await userService.getDashboardData(
      req.isAuthenticated(),
      req.user,
    );
    res.json({ errors: null, ...data });
  } catch (error) {
    error.message = "Failed to fetch dashboard data.";
    next(error);
  }
};

exports.authorizeUser = async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      throw new Error("Not authenticated. Access denied.");
    }
    const data = await userService.promoteToMember(
      req.isAuthenticated(),
      req.user,
    );
    console.log("Member status changed: ", req.user);
    res.json({ errors: null, ... data });
  } catch (error) {
    next(error);
  }
};
