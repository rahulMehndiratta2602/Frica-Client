const mongoose = require('mongoose')
const validator = require('validator')


const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: [true, "Please provide your email"],
        index: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    picture: String,
    role: {
        type: String,
        enum: {
            values: ['admin', 'user'],
            message: "Invalid User Role."
        },
        default: 'user'
    },
    cart: {
        type: Array,
        default: []
    },
    address: String,
    wishList: [{
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    }]
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User