const mongoose = require('mongoose')
const Product = require('./productModel')
const User = require('./userModel')


const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Review cannot be empty"]
    },
    rating: {
        type: Number,
        max: [5, "Rating should be less than or equal to 5"],
        min: [1, "Rating should be greater than or equal to 1"],
        required: [true, "Please provide a valid rating"]
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to a product']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must be written by a user']
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)
reviewSchema.index({ product: 1, user: 1 }, { unique: true })

reviewSchema.pre(/^find/, function (next) {
    // if uncomment this also change line 104
    // this.populate({
    //     path: 'product',
    //     select: 'slug'
    // }).populate({
    //     path: 'user',
    //     select: 'name'
    // })

    this.populate({
        path: 'user',
        select: 'name picture '
    })
    next()
})
reviewSchema.pre('save', function (next) {
    this.populate({
        path: 'product',
        select: 'slug'
    })
    this.populate({
        path: 'user',
        select: 'name'
    })
    next()
})
reviewSchema.statics.calcAvgRating = async function (productId) {
    console.log(productId)
    const stats = await this.aggregate([
        {
            $match: { product: productId }
        },
        {
            $group: {
                _id: '$product',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ])
    // console.log(stats)
    if (stats.length > 0) {
        await Product.findByIdAndUpdate(productId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        })
    } else {
        await Product.findByIdAndUpdate(productId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
        })
    }

}
reviewSchema.post('save', function () {
    // this points to current review document which is an instance of model on which we want to call the static method
    this.constructor.calcAvgRating(this.product._id)
})
reviewSchema.pre(/^findOneAnd/, async function (next) {
    //from documentation
    this.docToUpdate = await this.model.findOne(this.getQuery())
    next()
})

reviewSchema.post(/^findOneAnd/, async function () {
    // await this.findOne(); does NOT work here, query has already executed
    this.docToUpdate.constructor.calcAvgRating(this.docToUpdate.product)
    // this.docToUpdate.constructor.calcAvgRating(this.docToUpdate.product._id)

})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review