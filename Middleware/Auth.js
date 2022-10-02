const ErrorResponse = require("../Utils/ErrorResponse");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return next(new ErrorResponse("Access denied. No token provided", 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

module.exports = auth;