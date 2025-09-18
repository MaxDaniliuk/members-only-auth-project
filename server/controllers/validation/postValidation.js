const { body } = require("express-validator");

const postValidation = () => [
  body("topic").trim().notEmpty().withMessage("Title can not be empty."),
  body("post").notEmpty().withMessage("Post can not be empty."),
];

module.exports = postValidation;
