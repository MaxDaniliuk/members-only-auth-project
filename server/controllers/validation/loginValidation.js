const { body, validationResult } = require("express-validator");

const loginValidation = () => [
  body("username").trim().notEmpty().withMessage("Username can not be empty."),
  body("password").notEmpty().withMessage("Password can not be empty."),
  (req, res, next) => {
    const validationObject = validationResult(req);
    if (!validationObject.isEmpty()) {
      const customErrorObj = {
        username: null,
        password: null,
        generalMessage: null,
      };
      validationObject.array().forEach((error) => {
        if (customErrorObj.hasOwnProperty(error.path)) {
          customErrorObj[error.path] = error.msg;
        }
      });
      return res.status(400).json({ errors: customErrorObj, message: "" });
    }
    next();
  },
];

module.exports = loginValidation;
