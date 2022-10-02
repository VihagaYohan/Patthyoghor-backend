const express = require('express');
const router = express.Router();

const {registerUser,loginUser,currentUser} = require('../Controllers/Auth')
const Auth = require('../Middleware/Auth')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/currentUser').get(Auth,currentUser)

module.exports = router;