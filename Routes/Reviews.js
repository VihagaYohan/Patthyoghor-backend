const express = require('express');
const router = express.Router();

const{getAllReviewsByBook,addReview} = require('../Controllers/Review')
const Auth = require('../Middleware/Auth');
const Admin = require('../Middleware/Admin')

router.route('/books/:bookId').get(Auth,Admin,getAllReviewsByBook)
router.route('/').post(Auth,Admin,addReview)

module.exports = router;