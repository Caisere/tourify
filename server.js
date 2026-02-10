const mongoose = require('mongoose')
const dotenv = require('dotenv');
// must always come before app
dotenv.config({path: './config.env'});

const app = require('./src/app');


// console.log(process.env)

// Port
const PORT = process.env.PORT || 8000;

// mongodb url
const DB = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)


// mongoose connection
mongoose.connect(DB).then((con) => {
    console.log('DB connection successful!')
}).catch(err => {
    console.log('DB connection failed!')
    console.log(err)
})

// START SERVER
app.listen(PORT, () => {
    console.log(`Tourify server started at port ${PORT}`)
})