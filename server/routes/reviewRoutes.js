const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const reviewController = require('../controllers/reviewController')


router
    .route('/product/:productId')
    .get(authController.authCheck, reviewController.getReview)
    .post(authController.authCheck, reviewController.createReview)
    .patch(authController.authCheck, reviewController.updateReview)
    .delete(authController.authCheck, reviewController.deleteReview)


module.exports = router