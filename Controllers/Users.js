const { User, ValidateUser } = require("../Models/User");
const ErrorResponse = require("../Utils/ErrorResponse");

// @desc    Get all users
// @route   GET/api/users
// @access  PRIVATE
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users.length == 0) {
      return next(new ErrorResponse("There are no book users to show", 404));
    }

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    Get user by ID
// @route   GET/api/users/:id
// @access  PRIVATE
exports.getUserById = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.id);
    if (users.length == 0) {
      return next(
        new ErrorResponse("Unable to locate user for the given ID", 404)
      );
    }

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    Create user
// @route   POST/api/users
// @access  PRIVATE
exports.createUser = async (req, res, next) => {
  try {
    let { error } = ValidateUser(req.body);
    if (error) return next(new ErrorResponse(error[0].message));

    let { name, email, password } = req.body;
    let user = new User({
      name: name,
      email: email,
      password: password,
    });

    user = await user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error.message, 500);
  }
};
