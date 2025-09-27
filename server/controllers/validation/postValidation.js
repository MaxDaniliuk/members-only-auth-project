const { body, validationResult } = require("express-validator");

const postValidation = () => [
  body("topic").trim().notEmpty().withMessage("Title can not be empty."),
  body("post").notEmpty().withMessage("Post can not be empty."),
  (req, res, next) => {
    const validationObject = validationResult(req);
    if (!validationObject.isEmpty()) {
      const customErrorObj = {
        topic: null,
        post: null,
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

module.exports = postValidation;
