const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        trim:true,
        ref:"User"
    },
    bookId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        trim:true,
        ref:"Book"
    },
    review:{
        type:String,
        trim:true,
        minLength:[5, 'Review should be longer than 5 charachters'],
        maxLength:[500,'Review should not be longer than 500 characters']
    }
},{timestamps:true})

// create review schema
const Review = mongoose.model('Review',reviewSchema);

// validate review
const validateReview = reviewObj =>{
    const schema = Joi.object({
        userId:Joi.objectId().required(),
        bookId:Joi.objectId().required(),
        review:Joi.string().required().min(5).max(500)
    })
    return schema.validate(reviewObj)
}

module.exports = {
    Review,
    reviewSchema,
    validateReview
}