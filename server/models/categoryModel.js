const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        minlength: [2, "Too Short Name"],
        maxlength: [32, "Too Long Name"]
    },
    slug: {
        type: String,
        unique: true,
        index: true,
        lowercase: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema)