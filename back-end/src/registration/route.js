const express = require("express");
const {
  registration,
  getRegistration,
  profile,
  removeProfile,
  updateProfile,
} = require("./controller");

const router = express.Router();

// router.post("/signup", validateSignupRequest, isRequestValidated, signup);

router.get("/getRegistration", getRegistration);
router.get("/profile/:id", profile);

router.post("/registration", registration);
router.delete("/removeProfile/:id", removeProfile);
router.patch("/updateProfile/:id", updateProfile);

module.exports = router;
