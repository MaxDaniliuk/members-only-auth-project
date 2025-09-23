const { validationResult } = require("express-validator");
const db = require("../db/queries");

const createUserPost = async (req, res) => {
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

    const postData = await db.createNewPost(user_id, topic, post);
    if (!postData) {
      throw new Error();
    }

    console.log("Post created successfully!");
    console.log(postData);
    return res.status(200).json({
      errors: null,
      message: "User created and logged in.",
      user: user_id,
    });
  } catch (error) {
    console.error("Post submission failed: ", error.message);
    return res.status(500).json({
      errors: {
        ...customErrorObj,
        generalMessage:
          "Something went wrong on the server. Please try again later.",
      },
      message: "",
      user: null,
    });
  }
};

const postsGet = (req, res) => {
  res.status(200).json(res.locals.postsResponse);
};

module.exports = {
  createUserPost,
  postsGet,
};
