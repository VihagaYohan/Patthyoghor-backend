const { Review, reviewSchema, validateReview } = require("../Models/Review");
const ErrorResponse = require("../Utils/ErrorResponse");

// @desc    get all reviews for book
// @route   GET/api/reviews/books/bookId
// @access  PRIVATE
exports.getAllReviewsByBook = async (req, res, next) => {
  try {
    let reviews = await Review.find({ bookId: req.params.bookId }).populate(
      "userId bookId"
      
    );
    if (reviews.length == 0) {
      return next(new ErrorResponse("There are no reviews to show", 404));
    }

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    add review to book
// @route   POST/api/reviews
// @access  PRIVATE
exports.addReview = async (req, res, next) => {
  try {
    let { userId, bookId, review } = req.body;
    let { error } = validateReview(req.body);
    if (error) {
      return next(new ErrorResponse(error.details[0].message));
    } else {
      let reviewObj = await Review({
        userId: userId,
        bookId: bookId,
        review: review,
      });

      reviewObj = await reviewObj.save();
      res.status(200).json({
        success: true,
        data: reviewObj,
      });
    }
  } catch (error) {
    next(error.message, 500);
  }
};
