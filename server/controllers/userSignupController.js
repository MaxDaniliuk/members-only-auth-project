const loginUser = require("../authentication/loginUser");
const runMiddleware = require("./runMiddleware");
const {
  createHashedPassword,
} = require("../authentication/passwordController");
const prisma = require("../db/prisma");

const signupUserContoller = async (req, res, next) => {
  try {
    const { fullname, email, username, password, confirmPassword } = req.body;
    const saltLength = 10;
    try {
      const hashedPassword = await createHashedPassword(password, saltLength);
      await prisma.createUser(fullname, email, username, hashedPassword);
    } catch (error) {
      throw new Error("User creation failed. Please try again later.");
    }

    console.log("User created successfully.");
    await runMiddleware(req, res, loginUser);
    res.status(200).json({
      errors: null,
      message: "User created and logged in.",
      user: req.user,
      postsResponse: res.locals.postsResponse,
    });
  } catch (error) {
    console.error("Signup failed", error.message);
    next(error);
  }
};

module.exports = signupUserContoller;
