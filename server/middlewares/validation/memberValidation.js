require("dotenv").config();
const { body, validationResult } = require("express-validator");

const memberValidation = () => [
  body("passcode")
    .trim()
    .notEmpty()
    .withMessage("Passcode can not be empty.")
    .custom((value) => {
      if (value === process.env.PASSCODE) return true;
      throw new Error("Try your luck another time.");
    }),
  (req, res, next) => {
    const validationObject = validationResult(req);
    if (!validationObject.isEmpty()) {
      return res.status(400).json({ error: validationObject.errors[0].msg });
    }
    next();
  },
];

module.exports = memberValidation;
