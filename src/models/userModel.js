const mongoose = require('mongoose')

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

const User = mongoose.model('User', userSchema)


module.exports = User





// testUser.save().then(user => {
//     console.log('User saved successfully!')
//     console.log(user)
// }).catch(err => {
//     console.log('Error saving user!')
//     console.log(err)
// })