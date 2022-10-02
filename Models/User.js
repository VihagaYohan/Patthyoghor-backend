const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add user name"],
      trim: true,
      minLength: [2, "Name should be longer than 2 characters"],
      maxLength: [50, "Name should not be longer than 50 characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please add an email address"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add a valid email",
      ],
    },
    address: {
      type: String,
      trim: true,
      minLength: [10, "Address should be longer than 10 characters"],
      maxLength: [250, "Address should not be longer than 250 characters"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      trim: true,
      minlength: [4, "Password should be longer than 4 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "executive", "admin", "super-admin"],
      trim: true,
      default: "user",
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// create user model
const User = mongoose.model("User", userSchema);

// validation user model
const ValidateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

// create Signed and return JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


// create reset password token and set reset password & token expire date
userSchema.methods.getResetPasswordToken = async function () {
  // generate token
  const resetToken = await crypto.randomBytes(20).toString("hex");

  // hash token and set to resetPasswordToken field
  this.resetPasswordToken = await crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = {
  userSchema,
  ValidateUser,
  User,
};
