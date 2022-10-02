const { Book, validateBook } = require("../Models/Book");
const ErrorResponse = require("../Utils/ErrorResponse");


// @desc    get all books
// @route   GET/api/books
// @access  PUBLIC
exports.getAllBooks = async (req, res, next) => {
  try {
    let books = await Book.find().populate("authors");
    if (books.length == 0)
      return next(new ErrorResponse("There are no books to show", 404));

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    get all book by Id
// @route   GET/api/books/:id
// @access  PUBLIC
exports.getBookById = async (req, res, next) => {
  try {
    let book = await Book.findById(req.params.id);
    if (!book)
      return next(
        new ErrorResponse("Unable to locate book for the given ID", 404)
      );

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    Add book
// @route   POST/api/books
// @access  PUBLIC
exports.addBook = async (req, res, next) => {
  try {
    let { title, authors, genre, description } = req.body;
    let book = new Book({
      title: title,
      authors: authors,
      genere: genre,
      description: description,
    });
    book = await book.save();

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    update book by id
// @route   PUT/api/books/:id
// @access  PRIVATE
exports.updateBook = async (req, res, next) => {
  try {
    let book = await Book.findById(req.params.id);
    if (!book)
      return next(
        new ErrorResponse("Unable to locate book for the given ID", 404)
      );

    let { title, authors, genre, language, description } = req.body;
    book.title = title;
    book.authors = authors;
    book.genere = genre;
    book.language = language;
    book.description = description;

    book = await book.save();

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    upload book picture
// @route   PUT/api/books
// @access  PUBLIC
exports.uploadBookImage = async (req, res, next) => {
  try {
    res.status(200).json({
      success:true,
      data:"http://localhost:5000/uploads/" + req.file.path
    })
  } catch (error) {
    next(error.message, 500);
  }
};