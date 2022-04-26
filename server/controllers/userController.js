const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const User = require('../models/userModel')
const Product = require('../models/productModel')
const Cart = require('../models/cartModel')
const Order = require('../models/orderModel')
const stripeApi = require('../utils/stripe')

exports.createOrUpdateUser = async (req, res) => {
    const { name, picture, email } = req.user
    const { address } = req.body
    const user = await User.findOneAndUpdate({ email }, { name, picture, address }, { new: true, runValidators: true })
    if (user) {
        res.json({ status: "success", user })
    } else {
        const newUser = await new User({
            email,
            name: name || email.split('@')[0],
            picture,
            address
        }).save()
        res.status(200).json({ status: "success", user: newUser })
    }
}

exports.getMe = async (req, res) => {
    res.status(200).json({ status: "success", user: await User.findOne({ email: req.user.email }) })
}
exports.createOrder = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email })

    const presentCart = await Cart.findOne({ orderedBy: user._id })
    await Cart.findOneAndDelete({ orderedBy: user._id })
    presentCart.products.map(async (product) => {
        await Product.findByIdAndUpdate(product.product,
            { $inc: { quantity: -1 * product.count, sold: product.count } })
    })

    let checkoutSession
    if (req.body.session_id) {
        checkoutSession = await stripeApi.checkout.sessions.retrieve(req.body.session_id)
    }
    else {
        checkoutSession = {
            payment_intent: `pk_${user._id.toString().slice(-6)}_${Date.now()}`,
            id: `${user._id}_${Date.now()}`,
            payment_method_types: ['cash on delivery'],
            amount_subtotal: presentCart.cartTotal * 100,
            amount_total: presentCart.totalAfterDiscount * 100 || presentCart.cartTotal * 100,
            payment_status: 'unpaid',
        }
    }
    newOrder = await Order.create({ products: presentCart.products, checkoutSession, orderedBy: user._id })
    res.status(200).json({
        status: "success",
        order: newOrder
    })
})
exports.getOrder = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email })
    const orders = await Order.find({ orderedBy: user._id }).sort('-createdAt').populate('products.product')
    res.status(200).json({
        status: "success",
        orders
    })
})

exports.getWishList = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email })
    const { wishList } = await User.findById(user._id).populate('wishList').select('wishList')
    res.status(200).json({
        status: 'success',
        wishList
    })
})
exports.deleteWishlistItem = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email })
    const { productId } = req.params
    await User.findByIdAndUpdate(user._id, { $pull: { "wishList": productId } })
    res.status(200).json({
        status: "success"
    })
})
exports.addItemToWishlist = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email })
    const { productId } = req.params
    await User.findByIdAndUpdate(user._id, { $push: { "wishList": productId } })
    res.status(200).json({
        status: "success"
    })
})