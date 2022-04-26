const express = require('express')
const { getAllOrders, updateOrder } = require('../controllers/adminController')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/', authController.authCheck, authController.isAdmin, getAllOrders)
router.patch('/orderId/:orderId', authController.authCheck, authController.isAdmin, updateOrder)


module.exports = router