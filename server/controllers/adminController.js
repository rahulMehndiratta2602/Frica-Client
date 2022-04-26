const catchAsync = require("../utils/catchAsync")
const Order = require('../models/orderModel')
exports.getAllOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find({}).populate('products.product').populate('orderedBy', 'address email name').sort('-createdAt')
    res.status(200).json({
        status: "success",
        orders
    })
})

exports.updateOrder = catchAsync(async (req, res, next) => {
    const { orderId } = req.params
    const { orderStatus, paymentStatus } = req.body
    console.log(orderId, orderStatus, paymentStatus)
    await Order.findByIdAndUpdate(orderId, { orderStatus, $set: { "checkoutSession.payment_status": paymentStatus } })

    res.status(200).json({
        status: "success"
    })
})