const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      trim: true,
      ref: "User",
    },
    orderItems: {
      type: [],
      required: true,
    },
    orderTotal:{
        type:Number,
        min:0
    },
    orderStatus: {
      type: String,
      enum: ["completed", "pending", "delivered", "cancelled"],
      default: "pending",
    },
    address: {
      type: String,
      type: String,
      required: [true, "Please add an address"],
      maxlength: [255, "Address can not be more than 255 characters"],
    },
  },
  { timestamps: true }
);

// create order schema
const Order = mongoose.model("Order", orderSchema);

// validate order
const validateOrder = (order) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    orderItems: Joi.array().items(
      Joi.object({
        bookId: Joi.string().required(),
        bookName: Joi.string().required(),
        quantity: Joi.number().required(),
        unitPrice: Joi.number().required(),
        discount: Joi.number(),
        lineTotal: Joi.number().required(),
      })
    ),
    orderTotal:Joi.number().required(),
    address: Joi.string().max(255).required(),
  });
  return schema.validate(order);
};

module.exports = {
  orderSchema,
  Order,
  validateOrder,
};
