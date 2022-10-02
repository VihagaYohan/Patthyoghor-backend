const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add category name"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// create category model
const Category = mongoose.model('Category',categorySchema);

// validate category
const ValidateCategory = category =>{
    const schema = Joi.object({
        name:Joi.string().required()
    })
    return schema.validate(category)
}

module.exports = {
    categorySchema,
    Category,
    ValidateCategory
}
