const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
} = require("../Controllers/Users");

const Auth = require("../Middleware/Auth");
const Admin = require("../Middleware/Admin");

router.route("/").get(Auth, Admin, getAllUsers).post(Auth, Admin, createUser);

module.exports = router;
