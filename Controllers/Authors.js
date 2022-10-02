const { validateAuthor, Author } = require("../Models/Author");
const ErrorResponse = require("../Utils/ErrorResponse");

// @desc    Add author
// @route   PUT/api/authors
// @access  PUBLIC
exports.addAuthor = async (req, res, next) => {
  try {
    let { error } = validateAuthor(req.body);
    if (error) return next(new ErrorResponse(error.details[0].message, 400));

    let { name } = req.body;
    let author = new Author({
      name: name,
    });
    author = await author.save();

    res.status(200).json({
      success: true,
      data: author,
    });
  } catch (error) {
    next(error.message, 500);
  }
};
