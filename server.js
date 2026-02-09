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

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
    },
    imageUrl: {
        type: String,
        default: 'default.jpg',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
})


const Tour = mongoose.model('Tour', tourSchema)

const User = mongoose.model('User', userSchema)

const testUser = new User({
    name: 'Omoshola E',
    email: 'omoshola@gmail.com',
    password: 'password123',
    tole: 'admin',
})

const testTour = new Tour({
    name: 'The Park Camper',
    price: 995,
})

testTour.save().then(doc => {
    console.log('Tour saved successfully!')
    console.log(doc)
}).catch(err => {
    console.log('Error saving tour!')
    console.log(err)
})

testUser.save().then(user => {
    console.log('User saved successfully!')
    console.log(user)
}).catch(err => {
    console.log('Error saving user!')
    console.log(err)
})

// START SERVER
app.listen(PORT, () => {
    console.log(`Tourify server started at port ${PORT}`)
})