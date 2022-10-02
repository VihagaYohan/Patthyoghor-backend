const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
   return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = generateToken;
