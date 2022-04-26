const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const fs = require('fs')
const compression = require('compression')
const globalErrorHandler = require('./controllers/errorController')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
process.on('uncaughtException', err => {
    console.log(`${err.stack}`)
    console.log("UnCaught Exception! 💥 Shutting Down......")
    process.exit(1)
})


dotenv.config({ path: './config.env' })

//app
const app = express()

//db
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)
mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful!', ` Node Environment--->${process.env.NODE_ENV}`))
    .catch((err) => { console.log(`DATABASE ERROR ${err}`) })

//middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json({
    limit: '2mb',
    verify: (req, res, buffer) => req['rawBody'] = buffer
}))
app.use(cors({ origin: process.env.WEB_APP_URL }))
app.use(compression())

const fulfillOrder = (session) => {
    // TODO: fill me in
    console.log("Fulfilling order", session)
}


app.post('/webhook', (req, res) => {
    const sig = req.headers['stripe-signature']

    let event

    try {
        event = stripe.webhooks.constructEvent(req['rawBody'], sig, process.env.WEB_HOOK_SECRET)
    } catch (err) {
        console.log(err.message)
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object

        // Fulfill the purchase...
        fulfillOrder(session)
    }

    res.status(200)

})

app.get('/', (req, res) => {
    res.status(200).json({
        message: "HELLO FROM FRICA SERVER"
    })
})
//routes middleware
// app.use('/api/v1/users',userRoutes)
fs.readdirSync('./routes').map((file) => {
    if (file === 'categoryRoutes.js')
        app.use(`/api/v1/categories`, require('./routes/categoryRoutes'))
    else if (file === 'subCategoryRoutes.js')
        app.use(`/api/v1/subCategories`, require('./routes/subCategoryRoutes'))
    else app.use(`/api/v1/${file.replace('Routes.js', '')}s`, require(`./routes/${file}`))
})

app.use(globalErrorHandler)

const port = process.env.PORT || 8000

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})
process.on('unhandledRejection', err => {
    console.log("Unhandled Rejection! 💥 Shutting Down......")
    console.log(`${err.name}::: ${err.message}:::${err}`)
    server.close(() => {
        process.exit(1)
    })
})
