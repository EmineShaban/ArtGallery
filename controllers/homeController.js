// const { isAuth } = require('../middlewares/authMiddleware')

const router = require('express').Router()
const publicationServices = require('../services/publicationServices')
const userService = require('../services/userService')

router.get('/', async(req, res) => {
const public = await publicationServices.getAll().lean()
const publication = public.map(x => ({...x, shareCount: x.usersShared.length}))
    res.render('home', {publication})
})

router.get('/profile',async (req, res) => {
   const user = await userService.getOne(req.user._id).populate('publication').populate('shares').lean()
   const publicationTitles = user.publication.map(x => x.title).join(', ')
   const sharedTitles = user.shares.map(x => x.title).join(', ')
    res.render('home/profile', {...user, publicationTitles, sharedTitles})
})


module.exports = router