const admin = require("../firebase")
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const User = require('../models/userModel')
exports.authCheck = catchAsync(async (req, res, next) => {
    // console.log(req.headers)
    if (!req.headers.authtoken) {
        return next(new AppError("Please provide the authorization token", 404))
    }
    const fireBaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken)
    req.user = fireBaseUser
    next()
})
exports.isAdmin = catchAsync(async (req, res, next) => {
    const { email } = req.user
    const user = await User.findOne({ email })
    if (user.role !== 'admin')
        return next(new AppError('Admin Resource. Access Denied!'))
    next()
})