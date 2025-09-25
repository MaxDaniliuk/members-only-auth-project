const { validationResult } = require("express-validator");
const db = require("../db/queries");

const createUserPost = async (req, res, next) => {
  const customErrorObj = {
    topic: null,
    post: null,
    generalMessage: null,
  };

  try {
    const validationObject = validationResult(req);

    if (!validationObject.isEmpty()) {
      validationObject.array().forEach((error) => {
        if (customErrorObj.hasOwnProperty(error.path)) {
          customErrorObj[error.path] = error.msg;
        }
      });

      return res.status(400).json({ errors: customErrorObj, message: "" });
    }

    const { topic, post } = req.body;
    const user_id = req.user.user_id;

    await db.createNewPost(user_id, topic, post);

    console.log("Post created successfully!");
    next();
  } catch (error) {
    console.error("Post submission failed: ", error.message);
    error.message = "Post submission failed. Please try again.";
    next(error);
  }
};

async function fetchPosts(req, res, next) {
  try {
    let posts;
    let authorized;
    if (req.isAuthenticated() && req.user.ismember) {
      posts = await db.selectPostsAuthorized();
      authorized = true;
    } else {
      posts = await db.selectPostsUnauthorized();
      authorized = false;
    }
    res.locals.postsResponse = { authorized, posts };
    next();
  } catch (error) {
    error.message = "Failed to fetch posts...";
    next(error);
  }
}

const postsGet = (req, res) => {
  res.status(200).json(res.locals.postsResponse);
};

module.exports = {
  createUserPost,
  fetchPosts,
  postsGet,
};
