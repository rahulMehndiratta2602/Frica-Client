class AppError extends Error {
    constructor(message, statusCode) {
        // //console.log(message)
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
        //console.log('In AppError')
    }

}
module.exports = AppError