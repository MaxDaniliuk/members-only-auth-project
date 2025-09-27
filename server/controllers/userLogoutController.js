const logoutUser = require("../authentication/logoutUser");
const fetchPosts = require("../controllers/postsAuthorizationController");
const runMiddleware = require("./runMiddleware");

async function userLogoutController(req, res, next) {
  try {
    await runMiddleware(req, res, logoutUser);
    await runMiddleware(req, res, fetchPosts);
    res.status(200).json({
      errors: null,
      message: "User logged out.",
      user: null,
      logout: true,
      postsResponse: res.locals.postsResponse,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = userLogoutController;
