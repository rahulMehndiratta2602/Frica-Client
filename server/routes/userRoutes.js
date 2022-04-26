const express = require('express')
const authController = require('../controllers/authController')
const cartController = require('../controllers/cartController')
const userController = require('../controllers/userController')
const router = express.Router()

router.post("/createOrUpdateUser", authController.authCheck, userController.createOrUpdateUser)
router.post("/getMe", authController.authCheck, userController.getMe)
router.post("/isAdmin", authController.authCheck, authController.isAdmin, userController.getMe)
router.post("/cart", authController.authCheck, cartController.addUserCart)
router.get("/cart", authController.authCheck, cartController.getUserCart)
router.post("/coupon/:coupon", authController.authCheck, cartController.applyCouponToCart)
router.post("/order", authController.authCheck, userController.createOrder)
router.get("/order", authController.authCheck, userController.getOrder)

router.get('/wishlist', authController.authCheck, userController.getWishList)
router.post('/wishlist/:productId', authController.authCheck, userController.addItemToWishlist)
router.delete('/wishlist/:productId', authController.authCheck, userController.deleteWishlistItem)




module.exports = router