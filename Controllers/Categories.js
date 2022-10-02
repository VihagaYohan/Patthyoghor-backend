const { Category, ValidateCategory } = require("../Models/Category");
const ErrorResponse = require("../Utils/ErrorResponse");

// @desc    Get all categories
// @route   GET/api/categories
// @access  PUBLIC
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (categories.length == 0) {
      return next(
        new ErrorResponse("There are no book categories to show", 404)
      );
    }

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    Get category by Id
// @route   GET/api/categories/:id
// @access  PRIVATE
exports.getCategoryById = async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);
    if (category == null) {
      return next(
        new ErrorResponse("Unable to locate category for given ID", 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    Add category
// @route   POST/api/categories/
// @access  PRIVATE
exports.addCategory = async (req, res, next) => {
  try {
    // check for input data validation
    let { error } = ValidateCategory(req.body);
    if (error) return next(new ErrorResponse(error.details[0].message, 400));

    let category = new Category({
      name: req.body.name,
    });
    category = await category.save();

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    Update category
// @route   PUT/api/categories/:id
// @access  PRIVATE
exports.updateCategory = async (req, res, next) => {
  try {
    // check for the category
    let category = await Category.findById(req.params.id);
    if (category == null)
      return next(new ErrorResponse(error.details[0].message, 404));

    // check for input data validation
    let { error } = ValidateCategory(req.body);
    if (error) return next(new ErrorResponse(error.details[0].message, 400));

    category.name = req.body.name;
    category = await category.save();

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    delete category
// @route   DELETE/api/categories/:id
// @access  PRIVATE
exports.deleteCategory = async (req, res, next) => {
  try {
    // check for the category
    let category = await Category.findById(req.params.id);
    if (category == null)
      return next(new ErrorResponse(error.details[0].message, 404));

    category.isDeleted = true;
    category = await category.save();

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error.message, 500);
  }
};
