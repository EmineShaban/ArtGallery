const mongoose = require('mongoose')
const { use } = require('../routes')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    }

})

const User = mongoose.model('User', userSchema)

module.exports = User
