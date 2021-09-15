const mongoose = require("mongoose");
const Registration = require("./model");

exports.registration = async (req, res) => {
  try {
    const registration = new Registration({
      ...req.body,
      name: req.body.fullName,
      rollNumber: req.body.rollNo,
    });

    await Registration.create(registration);
    res.send({ message: "Success" });
  } catch (e) {
    console.log(e);
    res.send({ e, message: "registration api error" });
  }
};

exports.getRegistration = async (req, res) => {
  try {
    const data = await Registration.find({});
    res.send({ message: "Success", data });
  } catch (e) {
    console.log(e);
    res.send({ e, message: "getregistration api error" });
  }
};

exports.profile = async (req, res) => {
  try {
    const data = await Registration.findOne({ _id: req.params.id });
    res.send({ message: "Success", data });
  } catch (e) {
    console.log(e);
    res.send({ e, message: "getregistration api error" });
  }
};

exports.removeProfile = async (req, res) => {
  try {
    const data = await Registration.findByIdAndRemove({ _id: req.params.id });
    res.send({ message: "Success" });
  } catch (e) {
    console.log(e);
    res.send({ e, message: "getregistration api error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const data = await Registration.updateOne(
      { _id: req.params.id },
      { ...req.body, name: req.body.fullName, rollNumber: req.body.rollNo }
    );
    res.send({ message: "Success", data });
  } catch (e) {
    console.log(e);
    res.send({ e, message: "updateProfile api error" });
  }
};
