const express = require('express')

const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')



//  initialize express app
const app = express()


//1.  MIDDLEWARES
// morgan middleware for logging
app.use(morgan('dev'))

app.use(express.json())

app.use((req, res, next) => {
    console.log('Hello from the middleware 👋')
    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})


// 2. ROUTES
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)




module.exports = app