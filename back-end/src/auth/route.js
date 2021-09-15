const express = require("express");
const { signup, signin, signout } = require("./controller");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/auth");
// const controller = require("./controller");

const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);

router.post("/signin", validateSigninRequest, isRequestValidated, signin);

router.post("/signout", signout);

module.exports = router;
