const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        uppercase: true,
        required: [true, "Name is Required"],
        minLength: [6, "Too Short"],
        maxlength: [16, "Too Long"]
    },
    expiry: {
        type: Date,
        required: [true, "Expiry Date is required"],
    },
    discount: {
        type: Number,
        required: true
    }
}, { timestamps: true })
module.exports = mongoose.model('Coupon', couponSchema)