const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product'
            },
            count: Number,
            color: String,
        }
    ],
    checkoutSession: {},
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
            "Not Processed",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Delivered"
        ]
    },
    orderedBy: { type: mongoose.Schema.ObjectId, ref: "User" }
}, { timestamps: true })
module.exports = mongoose.model('Order', orderSchema)

