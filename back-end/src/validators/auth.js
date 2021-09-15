const { validationResult } = require("express-validator");
const { check } = require("express-validator");

exports.validateSignupRequest = [
  check("firstname").isEmpty().withMessage("first name is requried"),
  check("lastname").isEmpty().withMessage("last name is requried"),
  check("email").isEmail().withMessage("email is requried"),
  check("password").isLength({ min: 6 }).withMessage("password is requried"),
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("email is requried"),
  check("password").isLength({ min: 6 }).withMessage("password is requried"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
