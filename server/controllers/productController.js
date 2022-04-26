const Product = require('../models/productModel')
const slugify = require('slugify')
const catchAsync = require('../utils/catchAsync')
const User = require('../models/userModel')
const Review = require('../models/reviewModel')

exports.createProduct = catchAsync(async (req, res, next) => {

    req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    res.status(200).json({
        status: "success",
        newProduct
    })

})


exports.deleteProduct = catchAsync(async (req, res, next) => {
    const productToDelete = await Product.findOne({ slug: req.params.slug })
    const productId = productToDelete._id
    //Delete all reviews of that product
    await Review.deleteMany({ product: productId })
    await Product.findOneAndDelete({ slug: req.params.slug })
    res.status(204).json({
        status: "success"
    })
})
exports.getProduct = catchAsync(async (req, res, next) => {
    let product = null
    const query = Product.findOne({ slug: req.params.slug })
        .populate('reviews')
    if (req.body.populate)
        product = await query
            .populate('category')
            .populate('subCategories')
    else
        product = await query
    res.status(200).json({
        status: 'success',
        product
    })
})

exports.updateProduct = catchAsync(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    const newProduct = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { runValidators: true, new: true })
    res.status(200).json({
        status: 'success',
        product: newProduct
    })
})
exports.getProducts = catchAsync(async (req, res, next) => {

    let { sort, perPage, page } = req.body
    perPage = perPage * 1
    page = page * 1
    const pageNo = page || 1
    const skip = (pageNo - 1) * perPage
    let products = await Product.find({})
        .sort(`${sort} -_id`)
        .skip(skip)
        .limit(perPage)
        .populate('category')
        .populate('subCategories')
    res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products: products
        }
    })

})

exports.listRelated = catchAsync(async (req, res, next) => {

    const { productId } = req.params

    const { category } = await Product.findById(productId).select('category')
    const products = await Product.find({ category })
    res.status(200).json({
        status: "success",
        products
    })
})
exports.getProductsCount = catchAsync(async (req, res, next) => {

    let total = await Product.find({}).estimatedDocumentCount()
    res.status(200).json({
        total
    })
})


exports.addOrUpdateRating = catchAsync(async (req, res, next) => {
    let product = await Product.findOne({ _id: req.params.productId })
    let user = await User.find({ 'email': req.user.email })
    let { star } = req.body
    //Check if rating already exists
    //yes-->update
    const existingRating = product.ratings.find(rating => rating.postedBy === user._id)
    if (existingRating !== undefined) {
        let ratingUpdated = await Product.findOneAndUpdate({
            ratings: { $elemMatch: { postedBy: { $eq: user._id } } }
        },
            {
                $set: { 'ratings.$.star': star }
            }, { new: true })
        res.json({
            "updated": ratingUpdated
        })
    }
    //no-->push
    else {
        let ratingAdded = await Product.findOneAndUpdate({ _id: product._id }, { $push: { ratings: { star, "postedBy": user._id } } }, { new: true })
        res.json({
            "added": ratingAdded
        })
    }
})

exports.getFilteredProducts = catchAsync(async (req, res, next) => {
    const { search, priceRange, sort, shipping, chosenColors, chosenBrands, minRating, category, chosenSubCategories } = req.body
    let filterQuery = {}
    // filterQuery={
    //     $text: { $search: search },
    //      $and: [{ price: { $gte: priceRange[0] * 1 } }, { price: { $lte: priceRange[1] * 1 } }]
    //      category:category
    //      $min:{ratingsAverage:minRating}
    // }
    if (search)
        filterQuery.$text = { $search: search }
    if (priceRange)
        filterQuery.$and = [{ price: { $gte: priceRange[0] * 1 } }, { price: { $lte: priceRange[1] * 1 } }]
    if (category)
        filterQuery.category = category
    if (chosenSubCategories && chosenSubCategories.length > 0)
        filterQuery.subCategories = { $in: chosenSubCategories }
    if (minRating === 0)
        filterQuery.ratingsAverage = { $gte: minRating }
    else if (minRating > 0)
        filterQuery.$and = [{ ratingsQuantity: { $gt: 0 } }, { ratingsAverage: { $gte: minRating } }]
    if (chosenBrands && chosenBrands.length)
        filterQuery.brand = { $in: chosenBrands }
    if (chosenColors && chosenColors.length)
        filterQuery.color = { $in: chosenColors }
    if (shipping) {
        if (shipping !== 'any')
            filterQuery.shipping = shipping
    }
    const query = Product.find(filterQuery).sort(sort)

    const products = await query
    res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products
        }
    })
})

// exports.updateAllProducts = catchAsync(async (req, res, next) => {
//     await Product.updateMany({ ratingsAverage: 4.5 }, { ratingsAverage: 1 })
// })