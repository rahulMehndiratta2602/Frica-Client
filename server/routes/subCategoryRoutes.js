const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const subCategoryController = require('../controllers/subCategoryController')


router.route('/:slug')
    .get(subCategoryController.getSubCategory)
    .patch(authController.authCheck, authController.isAdmin, subCategoryController.updateSubCategory)
    .delete(authController.authCheck, authController.isAdmin, subCategoryController.deleteSubCategory)

router
    .route('/')
    .get(subCategoryController.listAllSubCategories)
    .post(authController.authCheck, authController.isAdmin, subCategoryController.createSubCategory)

module.exports = router