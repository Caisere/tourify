const Tour = require('../models/tourModel')



// get all tours
exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find()

        res.status(200).json({
            message: 'success',
            data: {
                allTours: tours
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }

}

// Get individual tour by Id
exports.getTourById = async (req, res) => {
    try {
        // get tour id from the request parameters
        const id = req.params.id;

        const tour = await Tour.findById(id)

        res.status(200).json({
            message: 'success',
            data: {
                tour
            }
        })

    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
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
exports.updateTour = async (req, res) => {
    try {        
        const id = req.params.id;

        const tour = await Tour.findByIdAndUpdate(id, req.body, {
            new: true, // return the updated document instead of the original document
            runValidators: true // run the validators defined in the tour schema before updating the document. this ensures that the data being updated is valid according to the schema rules.
        })
    
        res.status(200).json({
            message: 'success',
            data: {
                tour
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

// delete tour
exports.deleteTour = async (req, res) => {
    try {
        const id = req.params.id;
    
        await Tour.findByIdAndDelete(id)
        
        res.status(204).json({
            message: 'success'
        })
        
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}