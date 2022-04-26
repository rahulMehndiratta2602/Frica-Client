const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const slugify = require('slugify')
const SubCategory = require('../models/subCategoryModel')
const Product = require('../models/productModel')

exports.createSubCategory = catchAsync(async (req, res, next) => {
    // console.log(req.body)
    if (!req.body.name || !req.body.parent)
        return next(new AppError("Please provide a subCategory name and parent id.", 400))
    const { name, parent } = req.body
    const subCategory = await SubCategory.create({ name, parent, slug: slugify(name).toLowerCase() })
    res.status(200).json({
        status: "success",

    })
})

exports.getSubCategory = catchAsync(async (req, res, next) => {
    const subCategory = await SubCategory.findOne({ slug: req.params.slug })
    res.json({
        status: "success",
        subCategory
    })
})

exports.updateSubCategory = catchAsync(async (req, res, next) => {
    const subCategory = await SubCategory.findOneAndUpdate({ slug: req.params.slug }, { ...req.body, slug: slugify(req.body.name) }, { new: true, runValidators: true })
    res.json({
        status: "success",
        subCategory
    })
})

exports.deleteSubCategory = catchAsync(async (req, res, next) => {
    const subCat = await SubCategory.findOne({ slug: req.params.slug })
    const products = await Product.updateMany({ subCategories: subCat._id }, { $pull: { subCategories: subCat._id } }, { new: true })
    await SubCategory.findOneAndDelete({ slug: req.params.slug })
    res.status(204).json({
        status: "success",
    })
})

exports.listAllSubCategories = catchAsync(async (req, res, next) => {
    const subCategories = await SubCategory.find({}).sort({ createdAt: -1 })
    res.json({
        status: "success",
        results: subCategories.length,
        data: {
            subCategories
        }

    })
})