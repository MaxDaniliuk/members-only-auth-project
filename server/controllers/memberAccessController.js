const db = require("../db/queries");
const runMiddleware = require("./runMiddleware");
const fetchPosts = require("./postsAuthorizationController");

async function authorizeUser(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      await db.updateMembershipStatus(req.user.user_id);
      req.user.ismember = true;
      await runMiddleware(req, res, fetchPosts);
      console.log("Member status changed: ", req.user);
      return res.status(200).json({
        errors: null,
        message: "Member status set to true.",
        user: req.user,
        postsResponse: res.locals.postsResponse,
      });
    }
    throw new Error("Not authenticated. Access denied.");

  } catch (error) {
    next(error);
  }
}

module.exports = authorizeUser;
