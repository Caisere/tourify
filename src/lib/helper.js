const bcrypt = require('bcrypt')

exports.hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)
    return hashedPass
}

