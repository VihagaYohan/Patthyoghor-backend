const Joi = require("joi");
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minLength: [2, "Title should be longer than 2 characters long"],
    maxLength: [50, "Title should not be longer than 50 characters long"],
  },
  authors: {
    type: [mongoose.Schema.ObjectId],
    required: true,
    trim: true,
    ref: "Author",
  },
  genere: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  language: {
    type: String,
    enum: ["hindi", "english"],
    trim: true,
    required: true,
    default: "hindi",
  },
  description: {
    type: String,
    trim: true,
    minLength: [10, "Description should be longer than 10 characters"],
    maxLength: [250, "Description should be longer than 250 characters"],
  },
  isTrending:{
    type:Boolean,
    default:false
  },
  imageUrl:{
    type:String,
    default:"http://localhost:5000/uploads/default_book.jpg"
  }
},{timestamps:true});

// create book schema
const Book = mongoose.model("Book", bookSchema);

// validate book
const validateBook = (book) => {
  const schema = Joi.object({
    title: Joi.string().required().min(2).max(50),
  });
};

module.exports = {
  bookSchema,
  Book,
  validateBook,
};
