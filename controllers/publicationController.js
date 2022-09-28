const router = require('express').Router()

const { isAuth } = require('../middlewares/authMiddleware')
const publicationServices = require('../services/publicationServices')

router.use(isAuth)

router.get('/create', (req, res) => {
    res.render('publication/create')
})
router.post('/create', async (req, res) => {
    const createPublication = await publicationServices.create({...req.body, author: req.user._id})

    res.redirect('/publication')
})

module.exports = router