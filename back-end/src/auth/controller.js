const mongoose = require("mongoose");
const User = require("./model");
const crypto = require("crypto");
const key = "password";
const algo = "aes256";
const jwt = require("jsonwebtoken");
const jwtkey = "jwt";

exports.signup = async (req, res) => {
  var cipher = crypto.createCipher(algo, key);
  var encrypted =
    cipher.update(req.body.password, "utf-8", "hex") + cipher.final("hex");
  try {
    req.body.password = encrypted;

    const inputData = req.body;

    const emailExist = await User.findOne({
      email: inputData.email,
    });
    if (emailExist == null) {
      const { firstName, lastName, email, password } = req.body;

      const user = new User({
        firstName,
        lastName,
        email,
        hash_password: password,
      });

      await User.create(user);
      res.send({ message: "User Create sucessfull" });
    } else {
      if (emailExist != null) {
        res.status(200).send({
          error: "Email exists! Enter a new email",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.send({ err, message: "Signup api error" });
  }
};

exports.signin = async (req, res) => {
  try {
    const d1 = await User.findOne({ email: req.body.email });
    console.log("d1", d1);
    if (d1) {
      await User.findOne({ email: req.body.email }).then((data) => {
        var decipher = crypto.createDecipher(algo, key);
        var decreypted =
          decipher.update(d1.hash_password, "hex", "utf-8") +
          decipher.final("utf-8");
        if (decreypted === req.body.password) {
          console.log("if-------------------------------");
          jwt.sign({ _id: data._id, role: data.role }, jwtkey, (err, token) => {
            res.status(200).send({ token: token, user: d1 });
          });
        } else {
          res.status(200).send({ message: "password mot match" });
        }
      });
    } else {
      res.send({ message: "User not found" });
    }
  } catch (err) {
    console.log("ree,", err);
    res.status(400).send({ err, message: "Signin api error" });
  }
};

exports.signout = (req, res) => {
  try {
    res.clearCookie("token");
    res.send({ message: "Signout because token expire" });
  } catch (e) {
    console.log(e);
    res.send({ err, message: "Signiout api error" });
  }
};
