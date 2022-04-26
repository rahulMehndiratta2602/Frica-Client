const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const categoryController = require('../controllers/categoryController')


router.route('/:slug')
    .get(categoryController.getCategory)
    .patch(authController.authCheck, authController.isAdmin, categoryController.updateCategory)
    .delete(authController.authCheck, authController.isAdmin, categoryController.deleteCategory)

router
    .route('/')
    .get(categoryController.listAllCategories)
    .post(authController.authCheck, authController.isAdmin, categoryController.createCategory)



router.get('/:id/subCategories', categoryController.getCategorySubs)
module.exports = router