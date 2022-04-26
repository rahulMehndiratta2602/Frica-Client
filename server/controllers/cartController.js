const User = require('../models/userModel')
const Cart = require('../models/cartModel')
const Product = require('../models/productModel')
const Coupon = require('../models/couponModel')

const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.addUserCart = catchAsync(async (req, res, next) => {
    const { cart } = req.body
    const user = await User.findOne({ email: req.user.email })
    let products = []
    let existingCart = await Cart.findOne({ orderedBy: user._id })
    if (existingCart) {
        existingCart.remove()
    }
    let cartTotal = 0
    for (let i = 0; i < cart.length; i++) {
        let object = {}
        object.product = cart[i]._id
        object.count = cart[i].count
        object.color = cart[i].color
        let { price } = await Product.findById(cart[i]._id).select('price')
        object.price = price
        products.push(object)
        cartTotal += price * cart[i].count
    }
    let newCart = await Cart.create({ products, cartTotal, orderedBy: user._id })
    res.json({
        status: "success",
        // cart: newCart
    })
})

exports.getUserCart = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email })
    let cart = await Cart.findOne({ orderedBy: user._id }).populate("products.product", "_id title price ").populate("coupon")
    const { products, cartTotal, totalAfterDiscount, coupon } = cart
    res.json({ products, cartTotal, totalAfterDiscount: totalAfterDiscount, coupon })
})
exports.applyCouponToCart = catchAsync(async (req, res, next) => {
    const { coupon } = req.params
    const checkCoupon = await Coupon.findOne({ name: coupon, expiry: { $gt: new Date() } })
    let user = await User.findOne({ email: req.user.email })
    let cart = await Cart.findOne({ orderedBy: user._id })
    if (!checkCoupon) {
        await Cart.findOneAndUpdate({ orderedBy: user._id }, { $unset: { coupon: "", totalAfterDiscount: 0 } })
        return next(new AppError("Invalid or Expired Coupon", 400))
    }
    const totalAfterDiscount = (cart.cartTotal - checkCoupon.discount / 100 * cart.cartTotal).toFixed(2)
    const updatedCart = await Cart.findOneAndUpdate({ orderedBy: user._id }, { coupon: checkCoupon._id, totalAfterDiscount }, { new: true }).populate("products.product", "_id title price ").populate("coupon")
    res.status(200).json({
        status: "success",
        cart: updatedCart
    })
})