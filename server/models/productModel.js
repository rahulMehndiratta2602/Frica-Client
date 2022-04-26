const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        text: true
    },
    slug: {
        type: String,
        unique: true,
        index: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        text: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category"
    },
    subCategories: {
        type: [mongoose.Schema.ObjectId],
        ref: "SubCategory"
    },
    quantity: { type: Number },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array
    },
    shipping: {
        type: String,
        enum: ["Yes", "No"]
    },
    color: {
        type: String,
        enum: ["Black", "Brown", "Silver", "White", "Blue", "Red", "Golden", "Green"]
    },
    brand: {
        type: String,
        enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS", "Acer", "Dell", "HP"]
    },
    ratingsAverage: {
        type: Number,
        default: 1,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 100) / 100
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    // ratings: [
    //     {
    //         star: Number,
    //         postedBy: {
    //             type: mongoose.Schema.ObjectId,
    //             ref: "User"
    //         }
    //     }
    // ]
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)
//Virtually Populate reviews
productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
})

module.exports = mongoose.model("Product", productSchema)