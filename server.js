const dotenv = require('dotenv');
// must always come before app
dotenv.config({path: './config.env'});

const app = require('./src/app');


console.log(process.env)

// Port
const PORT = process.env.PORT || 8000;

// START SERVER
app.listen(PORT, () => {
    console.log(`Tourify server started at port ${PORT}`)
})