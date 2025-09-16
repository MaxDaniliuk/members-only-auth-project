const { validationResult } = require("express-validator");
const loginUser = require("../authentication/loginUser");

const loginUserPost = async (req, res, next) => {
  const customErrorObj = {
    username: null,
    password: null,
    generalMessage: null,
  };

  try {
    const validationObject = validationResult(req);

    if (!validationObject.isEmpty()) {
      validationObject.array().forEach((error) => {
        if (error.msg.startsWith("__DB_ERROR__:")) {
          throw new Error("Database-related error. Please try again later.");
        } else if (customErrorObj.hasOwnProperty(error.path)) {
          customErrorObj[error.path] = error.msg;
        }
      });

      return res.status(400).json({ errors: customErrorObj, message: "" });
    }

    console.log("User logged in successfully.");
    return loginUser(req, res, next);
  } catch (error) {
    console.error("Login failed", error.message);
    return res.status(500).json({
      errors: {
        ...customErrorObj,
        generalMessage:
          error.message ||
          "Something went wrong on the server. Please try again later.",
      },
      message: "",
      user: null,
    });
  }
};

module.exports = loginUserPost;
