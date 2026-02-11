const User = require('../models/userModel')


// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json({
            message: 'success',
            requestedAt: req.requestTime,
            data: {
                users
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// Get individual user by Id
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id)

        res.status(200).json({
            message: 'success',
            requestedAt: req.requestTime,
            data: {
                user
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// create User
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    } catch(err) {
        return res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

// update User
exports.updateUser = (req, res) => {
    const id = req.params.id;

    res.status(200).json({
        message: 'success',
        data: 'This Route data is not available yet'
    })
}

// delete User
exports.deleteUser = (req, res) => {
    const id = req.params.id;


    res.status(204).json({
        message: 'success',
    })
}