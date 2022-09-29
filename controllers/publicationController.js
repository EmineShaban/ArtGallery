const router = require('express').Router()

const { isAuth } = require('../middlewares/authMiddleware')
const publicationServices = require('../services/publicationServices')

router.get('/', async (req, res) => {
    const publication = await publicationServices.getAll().lean()
    res.render('publication', {publication})
})
router.get('/:publicationID/details', async (req, res) => {
    const publication = await publicationServices.getOneDetailed(req.params.publicationID).lean()
    res.render('publication/details', {...publication})
})

router.get('/create',isAuth, (req, res) => {
    res.render('publication/create')
})
router.post('/create', isAuth, async (req, res) => {
    const createPublication = await publicationServices.create({...req.body, author: req.user._id})

    res.redirect('/publication')
})

module.exports = router