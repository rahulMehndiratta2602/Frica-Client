const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const couponController = require('../controllers/couponController')

router
    .route('/')
    .get(
        couponController.listCoupons
    )
    .post(authController.authCheck,
        authController.isAdmin,
        couponController.createCoupon)

router.delete('/:couponId', authController.authCheck, authController.isAdmin, couponController.removeCoupon)
module.exports = router