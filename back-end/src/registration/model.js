const mongoose = require("mongoose");

// const { ObjectId } = mongoose.Schema;

const registerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rollNumber: {
      required: true,
      type: Number,
    },
    branch: {
      required: true,
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    registered: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Register", registerSchema);
