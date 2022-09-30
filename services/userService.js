const User = require('../models/User')

exports.getOne = (userId) => User.findById(userId)
exports.addPublication = async(userId, publicationID) =>{
// const user = await User.findById(userId)

// user.publication.push(publicationID)
// await user.save()
// return user
return User.updateOne({_id: userId}, {$push: {publication: publicationID}})
}
//  User.updateOne({_id: userId}, {$push: {publication: publicationID}})