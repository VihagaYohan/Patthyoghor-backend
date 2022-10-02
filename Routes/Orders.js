const express = require('express');
const router = express.Router();
const {
    getAllOrders,
    getOrderById,
    addOrder
} = require('../Controllers/Orders')
const Auth = require('../Middleware/Auth')
const Admin = require('../Middleware/Admin')

router.route('/').get(Auth,getAllOrders).post(Auth,Admin,addOrder);
router.route('/:id').get(Auth,getOrderById)

module.exports = router;