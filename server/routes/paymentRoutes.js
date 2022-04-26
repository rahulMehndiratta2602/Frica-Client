const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const paymentController = require('../controllers/paymentController')

router.post('/', authController.authCheck, paymentController.createCheckOutSession)

module.exports = router