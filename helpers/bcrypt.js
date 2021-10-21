const bcrypt = require('bcryptjs')
const saltRound  = 10

const hashPassword = (password) => bcrypt.hashSync(password, saltRound)
const compareHash = (password, dbPassword) => bcrypt.compareSync(password, dbPassword)

module.exports = {hashPassword, compareHash}
