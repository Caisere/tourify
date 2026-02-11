const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        select: false,
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
}, {timestamps: true}
)

const User = mongoose.model('User', userSchema)


module.exports = User





// testUser.save().then(user => {
//     console.log('User saved successfully!')
//     console.log(user)
// }).catch(err => {
//     console.log('Error saving user!')
//     console.log(err)
// })