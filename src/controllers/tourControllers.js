const fs = require('fs')


// fine to read using sync format. top level code run before event loop starts
const toursData = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`, 'utf-8'))

// middleware function to check ID validity
exports.checkID = (req, res, next, val) => {

    console.log(`Tour ID is: ${val}`)

    if (val > toursData.length) {
    // if (!tour) {
        return res.status(404).json({
            message: 'fail',
            error: 'Invalid tour ID'
        })
    }

    next()
}

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }
    next()
}


// get all tours
exports.getAllTours = (req, res) => {
    res.status(200).json({
        message: 'success',
        count: toursData.length,
        requestedAt: req.requestTime,
        data: {
            tours: toursData
        }
    })
}

// Get individual tour by Id
exports.getTourById = (req, res) => {
    const id = req.params.id;

    const tour = toursData.find(el => el.id === parseInt(id))

    res.status(200).json({
        message: 'success',
        requestedAt: req.requestTime,
        data: tour
    })
}

// create Tour
exports.createTour = (req, res) => {
    const newId = toursData.length + 1;
    
    const newTour = Object.assign({id: newId}, req.body)

    toursData.push(newTour)

    fs.writeFile(`${__dirname}/../dev-data/data/tours.json`, JSON.stringify(toursData), err => {

        if (err) {
            res.status(400).json({
                error: 'Error while writing to file'
            })
        }
    })

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
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