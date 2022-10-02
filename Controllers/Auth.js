const { User, ValidateUser } = require("../Models/User");
const ErrResponse = require("../Utils/ErrorResponse");
const generateToken = require("../Utils/Token");
const bcrypt = require("bcrypt");
const ErrorResponse = require("../Utils/ErrorResponse");
const CheckPassword = require("../Utils/Password");

// @desc    Register user
// @route   GET/api/users
// @access  PRIVATE
exports.registerUser = async (req, res, next) => {
  try {
    // check for input validation
    let { error } = ValidateUser(req.body);
    if (error) return next(new ErrResponse(error.details[0].message));

    // check email address already exists
    let user = await User.findOne({ email: req.body.email });
    if (user !== null)
      return next(
        new ErrResponse("The user email address already exists", 400)
      );

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword);

    let { name, email, password } = req.body;
    user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    user = await user.save();

    // create jwt token
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      data: user,
      token: token,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    Login user
// @route   POST/api/users
// @access  PRIVATE
exports.loginUser = async (req, res, next) => {
  try {
    // validate email and password
    let { email, password } = req.body;
    if (!email || !password) {
      return next(
        new ErrorResponse("Please provide an email and password", 400)
      );
    }

    // check for user
    let user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    console.log(user);
    const isMatch = await CheckPassword(password, user.password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword);

    // create jwt token
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    Get current user
// @route   Get/api/currentUser
// @access  PRIVATE
exports.currentUser = async (req, res, next) => {
    try {
      let user = await User.findById(req.user.id);

      res.status(200).json({
        success:true,
        data:user
      })
    } catch (error) {
      next(error.message, 500);
    }
  };
