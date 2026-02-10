const fs = require('fs')


// get all tours
exports.getAllTours = (req, res) => {
    res.status(200).json({
        message: 'success',
    })
}

// Get individual tour by Id
exports.getTourById = (req, res) => {
    res.status(200).json({
        message: 'success',
    })
}

// create Tour
exports.createTour = (req, res) => {

    res.status(201).json({
        status: 'success',
    })
}

// update tour
exports.updateTour = (req, res) => {
    const id = req.params.id;

    res.status(200).json({
        message: 'success',
        data: 'Updated tour here...'
    })
}

// delete tour
exports.deleteTour = (req, res) => {
    const id = req.params.id;

    res.status(204).json({
        message: 'success',
    })
}