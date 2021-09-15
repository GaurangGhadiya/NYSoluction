const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 11,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 11,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
  authenticaation: function (password) {
    return bcrypt.compare(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);
