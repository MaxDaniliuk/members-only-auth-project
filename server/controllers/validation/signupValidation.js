const db = require("../../db/queries");
const { body } = require("express-validator");

const signupValidation = () => [
  body("fullname").trim().notEmpty().withMessage("Name can not be empty."),
  body("email")
    .isEmail()
    .withMessage("Not a valid e-mail address")
    .custom(async (value) => {
      try {
        const user = await db.selectExistingUser("email", value);

        if (user) {
          throw new Error("Email already in use.");
        }
        return true;
      } catch (error) {
        if (error.message !== "Email already in use.") {
          throw new Error("__DB_ERROR__: " + error.message);
        }
        throw new Error(error.message);
      }
    }),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username can not be empty.")
    .custom(async (value) => {
      try {
        const user = await db.selectExistingUser("username", value);

        if (user) {
          throw new Error("Username already in use.");
        }
        return true;
      } catch (error) {
        if (error.message !== "Username already in use.") {
          throw new Error("__DB_ERROR__: " + error.message);
        }
        throw new Error(error.message);
      }
    }),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
];

module.exports = signupValidation;
