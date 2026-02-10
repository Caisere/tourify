const Tour = require('../models/tourModel')



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
exports.createTour =  async (req, res) => {
    try {
        // const newTour = new Tour(req.body)
        // newTour.save()

        // another way to save a document to the database. simpler and more concise. using the create() method of the Tour model. it creates a new document and saves it to the database in one step.
        const newTour = await Tour.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
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