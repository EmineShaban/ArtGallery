const router = require('express').Router()

const { isAuth } = require('../middlewares/authMiddleware')
const publicationServices = require('../services/publicationServices')
const { getErrorMessage } = require('../utils/errorHelper')

router.get('/', async (req, res) => {
    const publication = await publicationServices.getAll().lean()
    res.render('publication', { publication })
})
router.get('/:publicationID/details', async (req, res) => {
    const publication = await publicationServices.getOneDetailed(req.params.publicationID).lean()
    const isAuthor = publication.author._id == req.user._id

    res.render('publication/details', { ...publication, isAuthor })
})

router.post('/:publicationID/edit', isAuth, async (req, res) => {
    try {
        await publicationServices.update(req.params.publicationID, req.body)
        res.redirect(`publication/${req.params.publicationID}/details`)

    } catch (error) {
        res.render('publication/edit', { ...req.body, error: getErrorMessage(error) })

    }

})

router.get('/:publicationID/edit', isAuth, async (req, res, next) => {
    const publication = await publicationServices.getOne(req.params.publicationID).lean()
    if (publication.author != req.user._id) {
        return next({ message: 'You are not authorized', status: 401 })
    }

    res.render('publication/edit', { ...publication })
})






router.get('/create', isAuth, (req, res) => {
    res.render('publication/create')
})


router.post('/create', isAuth, async (req, res) => {
    try {
        const createPublication = await publicationServices.create({ ...req.body, author: req.user._id })
        res.redirect('/publication')

    } catch (error) {
        res.render('publication/create', { error: getErrorMessage(error) })
    }

})

module.exports = router