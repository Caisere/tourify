const express = require('express')
const fs = require('fs')
const morgan = require('morgan')



//  initialize express app
const app = express()

//1.  MIDDLEWARES

// morgan middleware for logging
app.use(morgan('dev'))

app.use(express.json())

app.use((req, res, next) => {
    console.log('Hello from the middleware 👋')
    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})



// Port
const PORT = 8080

// fine to read using sync format. top level code run before event loop starts
const toursData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, 'utf-8'))



// 2. ROUTE HANDLERS

// get all tours
const getAllTours = (req, res) => {
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
const getTourById = (req, res) => {
    const id = req.params.id;
    console.log(id)

    const tour = toursData.find(el => el.id === parseInt(id))


    // if (id > toursData.length) {
    if (!tour) {
        return res.status(404).json({
            message: 'fail',
            error: 'Invalid tour ID'
        })
    }

    res.status(200).json({
        message: 'success',
        requestedAt: req.requestTime,
        data: tour
    })
}

// create Tour
const createTour = (req, res) => {
    const newId = toursData.length + 1;

    console.log(newId)
    
    const newTour = Object.assign({id: newId}, req.body)

    toursData.push(newTour)

    fs.writeFile(`${__dirname}/dev-data/data/tours.json`, JSON.stringify(toursData), err => {

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
const updateTour = (req, res) => {
    const id = req.params.id;
    console.log(id)


    if (id > toursData.length) {
    // if (!tour) {
        return res.status(404).json({
            message: 'fail',
            error: 'Invalid tour ID'
        })
    }

    res.status(200).json({
        message: 'success',
        data: 'Updated tour here...'
    })
}

// delete tour
const deleteTour = (req, res) => {
    const id = req.params.id;
    console.log(id)


    if (id > toursData.length) {
    // if (!tour) {
        return res.status(404).json({
            message: 'fail',
            error: 'Invalid tour ID'
        })
    }

    res.status(204).json({
        message: 'success',
    })
}


// 3. ROUTES

// // GET
// app.get('/api/v1/tours', getAllTours)

// //GET (individual tour by Id) 
// app.get('/api/v1/tours/:id', getTourById)

// // POST
// app.post('/api/v1/tours', createTour)

// // PATCH   
// app.patch('/api/v1/tours/:id', updateTour)

// // DELETE
// app.delete('/api/v1/tours/:id', deleteTour)

app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app.route('/api/v1/tours/:id')
    .get(getTourById)
    .patch(updateTour)
    .delete(deleteTour)
    


// 4. START SERVER
app.listen(PORT, () => {
    console.log(`Tourify server started at port ${PORT}`)
})