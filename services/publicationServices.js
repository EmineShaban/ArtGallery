const Publication = require('../models/Publication')

exports.create = (publicationData) => Publication.create(publicationData)
exports.getAll = () => Publication.find()
exports.getOne = (publicationID) => Publication.findById(publicationID)
exports.getOneDetailed = (publicationID) => Publication.findById(publicationID).populate('author')
