const db = require("../../db/queries");
const { body } = require("express-validator");

const loginValidation = () => [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username can not be empty.")
    .custom(async (value) => {
      try {
        const user = await db.selectExistingUser("username", value);

        if (!user) {
          throw new Error("Incorrect username. Please try again.");
        }
        return true;
      } catch (error) {
        if (error.message !== "Incorrect username. Please try again.") {
          throw new Error("__DB_ERROR__: " + error.message);
        }
        throw new Error(error.message);
      }
    }),
  body("password").notEmpty().withMessage("Password can not be empty"),
];

module.exports = loginValidation;
