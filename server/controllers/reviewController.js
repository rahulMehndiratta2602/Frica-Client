const Review = require("../models/reviewModel")
const User = require("../models/userModel")
const catchAsync = require("../utils/catchAsync")


exports.getReview = catchAsync(async (req, res, next) => {
    let user = req.user
    const userId = await User.findOne({ email: user.email })
    const product = req.params.productId
    const review = await Review.findOne({ user: userId, product })
    res.status(200).json({
        review
    })
})
exports.createReview = catchAsync(async (req, res, next) => {
    let user = req.user
    const userId = await User.findOne({ email: user.email })
    const product = req.params.productId
    const { rating, review } = req.body
    const newReview = await Review.create({ rating, review, user: userId, product })
    res.status(201).json({
        review: newReview
    })
})
exports.deleteReview = catchAsync(async (req, res, next) => {
    let user = req.user
    const userId = await User.findOne({ email: user.email })
    const product = req.params.productId
    const newReview = await Review.findOneAndDelete({ user: userId, product })
    res.status(204).json({
        status: 'success'
    })
})
exports.updateReview = catchAsync(async (req, res, next) => {

    let user = req.user
    const userId = await User.findOne({ email: user.email })
    const product = req.params.productId
    const { rating, review } = req.body
    const newReview = await Review.findOneAndUpdate({ user: userId, product }, { rating, review }, { new: true, runValidators: true })
    res.status(200).json({
        review: newReview
    })
})