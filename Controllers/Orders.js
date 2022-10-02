const { Order, validateOrder } = require("../Models/Order");
const { User } = require("../Models/User");
const ErrorResponse = require("../Utils/ErrorResponse");
const getOrderTotal = require("../Utils/Order");

// @desc    get all orders
// @route   GET/api/orders
// @access  PRIVATE
exports.getAllOrders = async (req, res, next) => {
  try {
    let orders = await Order.find().populate("userId");
    if (orders.length == 0)
      return next(new ErrorResponse("There are no orders to show", 404));

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    get order by Id
// @route   GET/api/orders/id
// @access  PRIVATE
exports.getOrderById = async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id).populate("userId");
    if (!order)
      return next(
        new ErrorResponse("Unable to locate order for given ID", 404)
      );

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error.message, 500);
  }
};

// @desc    Add order
// @route   POST/api/order
// @access  PRIVATE
exports.addOrder = async (req, res, next) => {
  try {
    let { userId, orderItems, address } = req.body;
    let orderTotal = getOrderTotal(orderItems);
    if (orderTotal == 0) {
      return next(new ErrorResponse("Please add order items", 400));
    } else {
      let payload = {
        userId: userId,
        orderItems: orderItems,
        orderTotal: orderTotal,
        address: address,
      };
      console.log(orderTotal);

      // input validation
      let { error } = validateOrder(payload);
      if (error) {
        return next(new ErrorResponse(error.details[0].message, 400));
      } else {
        let order = await Order({
          userId: payload.userId,
          orderItems: payload.orderItems,
          orderTotal: payload.orderTotal,
          address: payload.address,
        });
        order = await order.save();

        res.status(200).json({
          success: true,
          data: order,
        });
      }
    }
  } catch (error) {
    next(error.message, 500);
  }
};
