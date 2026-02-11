const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const Tour = require('./../models/tourModel')

dotenv.config({path: './config.env'});

const DB_URL = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB_URL).then(con => {
    console.log('DB connection successful!')
}).catch(err => {
    console.log('DB connection failed!')
    console.log(err)
})

// read the data json file
const toursArr = JSON.parse(fs.readFileSync(`${__dirname}/data/simple-tours.json`, 'utf-8'))


// clear the database before seeding 
const clearDB = async () => {
    try {
        await Tour.deleteMany()
        console.log('Database cleared successfully!')
    } catch (error) {
        console.log(error)
    }

    process.exit()
}

// seed data into the database
const seedData = async () => {
    try {
        for (const tour of toursArr) {
            await Tour.create(tour)
            console.log(`Tour ${tour.name} seeded successfully!`)
        }
        console.log('Data seeded successfully!')
    } catch (error) {
        console.log(error)
    }

    process.emit()
}

if (process.argv[2] === '--seed') {
    seedData()
} else if (process.argv[2] === '--clear') {
    clearDB()
}


console.log(process.argv)


