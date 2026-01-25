const express = require('express')
const fs = require('fs')

const app = express()

const PORT = 8080

// fine to read using sync format. top level code run before event loop starts
const toursData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, 'utf-8'))


app.get('/api/v1/tours', (req, res) => {
    // console.log(toursData)
    res.status(200).json({
        message: 'success',
        count: toursData.length,
        data: {
            tours: toursData
        }
    })
})

app.listen(PORT, () => {
    console.log(`Tourify server started at port ${PORT}`)
})