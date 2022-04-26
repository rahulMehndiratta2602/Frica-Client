const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const slugify = require('slugify')
const Category = require('../models/categoryModel')
const SubCategory = require('../models/subCategoryModel')
const Product = require('../models/productModel')



exports.createCategory = catchAsync(async (req, res, next) => {
    // console.log(req.body)
    if (!req.body.name)
        return next(new AppError("Please provide a category name", 400))
    const { name } = req.body
    const category = await Category.create({ name, slug: slugify(name).toLowerCase() })
    res.status(200).json({
        status: "success",
        category
    })
})

exports.getCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findOne({ slug: req.params.slug })
    res.json({
        status: "success",
        category
    })
})

exports.updateCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findOneAndUpdate({ slug: req.params.slug }, { ...req.body, slug: slugify(req.body.name) }, { new: true, runValidators: true })
    res.json({
        status: "success",
        category
    })
})

exports.deleteCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findOne({ slug: req.params.slug })
    await SubCategory.deleteMany({ parent: category._id })
    await Product.deleteMany({ category: category._id })
    await Category.findOneAndDelete({ slug: req.params.slug })
    res.status(204).json({
        status: "success",
    })
})

exports.listAllCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.find({}).sort({ createdAt: -1 })
    res.json({
        status: "success",
        results: categories.length,
        data: {
            categories
        }

    })
})

exports.getCategorySubs = catchAsync(async (req, res, next) => {
    const subs = await SubCategory.find({ parent: req.params.id })
    res.status(200).json({
        status: "success",
        results: subs.length,
        data: {
            subCategories: subs
        }
    })
})