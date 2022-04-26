const catchAsync = require("../utils/catchAsync")
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
exports.uploadImage = catchAsync(async (req, res, next) => {
    let result = await cloudinary.uploader.upload(req.body.image, {
        public_id: `${Date.now()}`,
        resource_type: "auto",
    })
    res.status(200).json({
        public_id: result.public_id,
        url: result.secure_url
    })

})
exports.removeImage = catchAsync(async (req, res, next) => {
    let image_id = req.body.public_id

    cloudinary.uploader.destroy(image_id, (err, result) => {
        if (err) return res.status(400).json({
            status: "fail"
        })
        res.status(204).json({
            status: "success"
        })
    })
})