const User = require('../models/userModel')

// get all users
exports.getAllUsers = (req, res) => {
    res.status(200).json({
        message: 'success',
        requestedAt: req.requestTime,
        data: 'This Route data is not available yet'
    })
}

// Get individual user by Id
exports.getUserById = (req, res) => {
    const id = req.params.id;


    res.status(200).json({
        message: 'success',
        requestedAt: req.requestTime,
        data: 'This Route data is not available yet'
    })
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