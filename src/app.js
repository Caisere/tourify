const express = require('express')
const fs = require('fs')

const app = express()

// middleware
app.use(express.json())

const PORT = 8080

// fine to read using sync format. top level code run before event loop starts
const toursData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, 'utf-8'))


// GET
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        message: 'success',
        count: toursData.length,
        data: {
            tours: toursData
        }
    })
})

// POST
app.post('/api/v1/tours', (req, res) => {
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
})

app.listen(PORT, () => {
    console.log(`Tourify server started at port ${PORT}`)
})