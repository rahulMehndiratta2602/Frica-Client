const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const imageController = require('../controllers/imageController')

router.route('/upload')
    .post(
        authController.authCheck, authController.isAdmin, imageController.uploadImage
    )

router.route('/remove')
    .post(
        authController.authCheck, authController.isAdmin, imageController.removeImage
    )
module.exports = router