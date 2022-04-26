const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const stripeApi = require('../utils/stripe')
const Product = require('../models/productModel')

exports.createCheckOutSession = catchAsync(async (req, res, next) => {
    const domainUrl = process.env.WEB_APP_URL
    const { cart } = req.body
    if (!cart.products.length) {
        return new AppError("At least one product should be present", 400)
    }
    let coupon = {}
    if (cart.coupon) {
        coupon = await stripeApi.coupons.retrieve(
            cart.coupon._id
        ).catch(async err => {
            await stripeApi.coupons.create({
                percent_off: cart.coupon.discount,
                id: cart.coupon._id,
                name: cart.coupon.name
            })
        })

    }
    let line_items = []
    line_items = await Promise.all(cart.products.map(async product => {
        const productFromDb = await Product.findById(product._id)
        return ({
            quantity: product.count,
            price_data: {
                currency: 'inr',
                unit_amount: productFromDb.price * 100,
                product_data: {
                    name: `${product.brand.toUpperCase()}-${product.title}`,
                    images: [product.images[0].url]
                }
            }
        })
    }))

    const sessionObject = {
        success_url: `${domainUrl}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainUrl}/payments/cancel`,
        mode: 'payment',
        payment_method_types: ['card'],
        line_items,
        customer_email: req.user.email,
        discounts: [{
            coupon: cart.coupon._id
        }]
    }
    let session
    try {
        session = await stripeApi.checkout.sessions.create(sessionObject)
        res.status(200).json({
            status: "success",
            sessionId: session.id
        })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            error: err,
            message: err.message
        })
    }
})
