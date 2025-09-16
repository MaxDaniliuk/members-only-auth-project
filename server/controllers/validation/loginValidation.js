const db = require("../../db/queries");
const { body } = require("express-validator");

const loginValidation = () => [
  body("username").trim().notEmpty().withMessage("Username can not be empty."),
  body("password").notEmpty().withMessage("Password can not be empty"),
];

module.exports = loginValidation;
