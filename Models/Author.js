const Joi = require('joi');
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minLength:[2,'Name should be longer than 2 charachters'],
        maxLength:[50,'Name should not be longer than 50 charachters'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
      },
},{timestamps:true})

// create author model
const Author = mongoose.model('Author',authorSchema);

// validate author
const validateAuthor = author =>{
    const schema = Joi.object({
        name:Joi.string().min(2).max(50).required()
    })
    return schema.validate(author)
}

module.exports = {
    authorSchema,
    Author,
    validateAuthor
}