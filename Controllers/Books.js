const { Book, validateBook } = require("../Models/Book");
const { Category } = require("../Models/Category");
const ErrorResponse = require("../Utils/ErrorResponse");

// @desc    get all books
// @route   GET/api/books
// @access  PUBLIC
exports.getAllBooks = async (req, res, next) => {
  try {
    console.log(req.query);
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
    let book = await Book.findById(req.params.id).populate('authors genere',);
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

// @desc    get all trending books
// @route   GET/api/books/trending
// @access  PUBLIC
exports.getTrendingBooks = async (req, res, next) => {
  try {
    let books = await Book.find({ isTrending: true });
    if (books.length == 0)
      return next(
        new ErrorResponse("There are no trending books to show", 404)
      );

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    get all books by book types
// @route   GET/api/books/types
// @access  PUBLIC
exports.getBooksByType = async (req, res, next) => {
  try {
    let books = await Category.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "genere",
          as: "books",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: books,
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

    let { title, authors, genre, language, description, isTrending } = req.body;
    book.title = title;
    book.authors = authors;
    book.genere = genre;
    book.language = language;
    book.description = description;
    book.isTrending = isTrending;

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
// @route   POST/api/books/upload/:id
// @access  PUBLIC
exports.uploadBookImage = async (req, res, next) => {
  try {
    /* res.status(200).json({
      success:true,
      data:"http://localhost:5000/uploads/" + req.file.path
    }) */

    let book = await Book.findById(req.params.id);
    if (!book)
      return next(
        new ErrorResponse("Unable to locate the book for give ID", 404)
      );
    console.log(req.file);

    let imagePath = "http://localhost:5000/uploads/" + req.file.filename;

    let { title, authors, genre, language, description, isTrending } = req.body;
    book.title = book.title;
    book.authors = book.authors;
    book.genere = book.genere;
    book.language = book.language;
    book.description = book.description;
    book.isTrending = book.isTrending;
    book.imageUrl = imagePath;

    book = await book.save();

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    add content to books
// @route   POST/api/books/content/:id
// @access  PUBLIC
exports.addContents = async(req,res,next) =>{
  try{
    let book = await Book.findById(req.params.id)
    if (!book)
    return next(
      new ErrorResponse("Unable to locate the book for give ID", 404)
    );

    let {title,authors,genere,language,price,description,isTrending,imageUrl} = book;
    book.title = title;
    book.authors = authors;
    book.genere = genere;
    book.language = language;
    book.price = price;
    book.description = description;
    book.isTrending = isTrending;
    book.imageUrl = imageUrl;
    book.content = req.body.content

    book = await book.save();

    res.status(200).json({
      success:true,
      data:book
    })

  }catch(error){
    next(error.message,500)
  }
}
