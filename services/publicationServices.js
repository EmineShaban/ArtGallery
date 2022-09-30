const Publication = require('../models/Publication')
const User = require('../models/User')

exports.getAll = () => Publication.find()
exports.getOne = (publicationID) => Publication.findById(publicationID)
exports.getOneDetailed = (publicationID) => Publication.findById(publicationID).populate('author')
exports.update = (publicationID, publicationData) => Publication.updateOne({ _id: publicationID }, { $set: publicationData }, { runValidators: true })
exports.delete = (publicationID) => Publication.deleteOne({ _id: publicationID })
exports.create = async (publicationData) => Publication.create(publicationData)
