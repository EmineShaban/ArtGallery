const User = require('../models/User')
const bcrypt = require('bcrypt')


exports.create = (userData) => User.create(userData)

exports.login = async (username, password) => {
    const user = await User.findOne ({username})

    if(!user) {
        throw{ message: 'Cannot find username or password'}
    }

    const isValid = bcrypt.compare(password, user.password)

    if(!isValid){
        throw{ message: 'Cannot find username or password'}

    }

}