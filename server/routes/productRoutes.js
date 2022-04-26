const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

const productController = require('../controllers/productController')



router
    .route('/')
    .post(
        authController.authCheck, authController.isAdmin,
        productController.createProduct
    )


router.get('/getCount',
    productController.getProductsCount
)

router
    .post('/list', productController.getProducts)
    .post('/listRelated/:productId', productController.listRelated)
router
    .route('/slug/:slug')
    .post(productController.getProduct)
    .delete(authController.authCheck, authController.isAdmin,
        productController.deleteProduct)
    .patch(authController.authCheck, authController.isAdmin, productController.updateProduct)

router.post('/filter', productController.getFilteredProducts)
//rating
router.patch('/star/product/:productId', authController.authCheck, productController.addOrUpdateRating)


module.exports = router