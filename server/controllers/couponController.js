const catchAsync = require("../utils/catchAsync")
const Coupon = require('../models/couponModel')
exports.listCoupons = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: {
            coupons: await Coupon.find({}).sort("-createdAt")
        }
    })
})
exports.createCoupon = catchAsync(async (req, res, next) => {
    const { name, expiry, discount } = req.body
    const newCoupon = await Coupon.create({ name, expiry, discount })
    res.json({
        status: "success",
        coupon: newCoupon
    })
})
exports.removeCoupon = catchAsync(async (req, res, next) => {
    await Coupon.findByIdAndDelete(req.params.couponId)
    res.status(204).json({
        status: "success"
    })
})
