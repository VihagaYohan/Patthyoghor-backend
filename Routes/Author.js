const express = require('express');
const router = express.Router();
const {addAuthor} = require('../controllers/Authors')
const Auth = require('../Middleware/Auth')
const Admin = require('../Middleware/Admin')

router.route('/').post(Auth,addAuthor)

module.exports = router;