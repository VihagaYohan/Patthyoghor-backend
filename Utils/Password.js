const bcrypt = require('bcrypt')

const CheckPassword = async (password,hashedPassword) =>{
    return await bcrypt.compare(password,hashedPassword)
}

module.exports = CheckPassword