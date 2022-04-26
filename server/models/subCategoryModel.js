const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        minlength: [2, "Too Short Name"],
        maxlength: [64, "Too Long Name"]
    },
    slug: {
        type: String,
        unique: true,
        index: true,
        lowercase: true
    },
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    }
}, { timestamps: true })

subCategorySchema.pre(/^find/, function (next) {
    this.populate({
        path: 'parent',
        select: '_id name slug'
    })
    next()
})
module.exports = mongoose.model('SubCategory', subCategorySchema)