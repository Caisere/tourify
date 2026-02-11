const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('./../models/userModel')
const {hashedPassword} = require('./../lib/helper')

dotenv.config({path: './config.env'})

const DB_KEY = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB_KEY).then(con => {
    console.log('DB connection successful!')
}).catch(err => {
    console.log('DB connection failed!')
    console.log(err)
})


const usersArr = JSON.parse(fs.readFileSync(`${__dirname}/data/dev-user.json`, 'utf-8'))

const clearUserDb = async () => {
    try {
        await User.deleteMany()
        console.log('User database cleared successfully!')
    } catch (error) {
        console.log(error)
    }

    process.exit()
}

const seedUserData = async () => {
    try {
        for (const user of usersArr) {
            const hashedUsersPasswoord = await hashedPassword(user.password)
            const userWithHashedPassword = {...user, password: hashedUsersPasswoord}

            await User.create(userWithHashedPassword)

            console.log(`User ${user.name} seeded successfully!`)
        }
            console.log('User data seeded successfully!')
    } catch (error) {
        console.log(error)
    }

    process.exit()
}



if (process.argv[2] === '--clearUser'){
    clearUserDb()
} else if(process.argv[2] === '--seedUser') {
    seedUserData()
}