const app = require('./src/app');


// Port
const PORT = 8080

// START SERVER
app.listen(PORT, () => {
    console.log(`Tourify server started at port ${PORT}`)
})