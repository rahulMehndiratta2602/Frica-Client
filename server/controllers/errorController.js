const AppError = require('../utils/appError')
/*
auth/app-deleted
Thrown if the instance of FirebaseApp has been deleted.
auth/app-not-authorized
Thrown if the app identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.
auth/argument-error
Thrown if a method is called with incorrect arguments.
auth/invalid-api-key
Thrown if the provided API key is invalid. Please check that you have copied it correctly from the Firebase Console.
auth/invalid-user-token
Thrown if the user's credential is no longer valid. The user must sign in again.
auth/invalid-tenant-id
Thrown if the tenant ID provided is invalid.
auth/network-request-failed
Thrown if a network error (such as timeout, interrupted connection or unreachable host) has occurred.
auth/operation-not-allowed
Thrown if you have not enabled the provider in the Firebase Console. Go to the Firebase Console for your project, in the Auth section and the Sign in Method tab and configure the provider.
auth/requires-recent-login
Thrown if the user's last sign-in time does not meet the security threshold. Use firebase.User.reauthenticateWithCredential to resolve. This does not apply if the user is anonymous.
auth/too-many-requests
Thrown if requests are blocked from a device due to unusual activity. Trying again after some delay would unblock.
auth/unauthorized-domain
Thrown if the app domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.
auth/user-disabled
Thrown if the user account has been disabled by an administrator. Accounts can be enabled or disabled in the Firebase Console, the Auth section and Users subsection.
auth/user-token-expired
Thrown if the user's credential has expired. This could also be thrown if a user has been deleted. Prompting the user to sign in again should resolve this for either case. */
const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })
    }
    res.status(err.statusCode).render('error', {
        title: "Something went wrong!",
        msg: err.message
    })
}
const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            })
        } else {
            console.log("💥  Non Operational Error 💥 ", err)
            res.status(500).json({
                status: 'error',
                message: 'Something went very very wrong'
            })
        }
    }
    else {
        if (err.isOperational) {
            res.status(err.statusCode).render('error', {
                title: "Something went wrong!",
                msg: err.message
            })
        }
        else {
            res.status(err.statusCode).render('error', {
                title: "Something went wrong!",
                msg: "Please try again later"
            })
        }
    }
}
const handleFirebaseAuthError = (err) => {
    return new AppError(`Invalid/Expired Authentication Token. Please login again`, 404)
}
const handleFirebaseUserDisabledError = (err) => {
    return new AppError("Your account has been disabled/blocked. Please contact the admin", 404)
}
const handleCastErrorDB = (err) => {
    return new AppError(`Invalid ${err.path}: ${err.value}`, 404)
}
const handleDuplicateFieldsDB = (err) => {
    let duplicateFieldName = Object.keys(err.keyValue)[0]
    let duplicateFieldValue = Object.values(err.keyValue)[0]
    return new AppError(`Duplicate Field value "${duplicateFieldValue}" for "${duplicateFieldName}".Please use another value.`, 404)
}
const handleValidationErrorDB = err => {
    return new AppError(err.message, 404)
}
const handleJWTverificationError = () => new AppError('Invalid token. Please login again!', 401)
const handleJWTExpirationError = () => new AppError('Token has expired! Please log in again', 401)
module.exports = (err, req, res, next) => {
    //console.log('Inside Error Controller', err)
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res)
    }
    else {
        console.log(err)
        if (err.name === 'CastError') {
            err = handleCastErrorDB(err)
        }
        else if (err.code === 11000) {
            err = handleDuplicateFieldsDB(err)
        } else if (err.name === "ValidationError") {
            err = handleValidationErrorDB(err)
        }
        else if (err.name === "TokenExpiredError") {
            err = handleJWTExpirationError()
        }
        else if (err.name === "JsonWebTokenError") {
            err = handleJWTverificationError()
        }
        else if (err.code === "auth/argument-error" || err.code === "auth/invalid-user-token" || err.code === "auth/id-token-expired" || err.code === "auth/id-token-revoked") {
            err = handleFirebaseAuthError()
        }
        else if (err.code === "auth/user-disabled") {
            err = handleFirebaseUserDisabledError()
        }
        // //console.log(err)
        sendErrorProd(err, req, res)
    }

}