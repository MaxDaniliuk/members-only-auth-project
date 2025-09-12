const { validationResult } = require("express-validator");
const loginUser = require("../authentication/loginUser");
const {
  createHashedPassword,
} = require("../authentication/passwordController");
const db = require("../db/queries");

const signupUserPost = async (req, res, next) => {
  const customErrorObj = {
    fullname: null,
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
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

    const { fullname, email, username, password, confirmPassword } = req.body;
    const saltLength = 10;
    try {
      const hashedPassword = await createHashedPassword(password, saltLength);

      await db.createNewUser(fullname, email, username, hashedPassword);
    } catch (error) {
      throw new Error("User creation failed. Please try again later.");
    }

    console.log("User created successfully.");
    return loginUser(req, res, next);
  } catch (error) {
    console.error("Signup failed", error.message);
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

module.exports = signupUserPost;
