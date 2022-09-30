const router = require('express').Router()

const { isAuth } = require('../middlewares/authMiddleware')
const { isPublicationAuthor, preloadPublication } = require('../middlewares/publicationMiddleware')
const publicationServices = require('../services/publicationServices')
const userService = require('../services/userService')

const { getErrorMessage } = require('../utils/errorHelper')

router.get('/', async (req, res) => {
    const publication = await publicationServices.getAll().lean()
    res.render('publication', { publication })
})

router.get(
    '/:publicationID/details',
    async (req, res) => {
        const publication = await publicationServices.getOneDetailed(req.params.publicationID).lean()
        const isAuthor = publication.author._id == req.user?._id
        // const isShared = publication.usersShared.includes(req.user._id) 
        const isShared = publication.usersShared.find(element => element == req.user._id) == req.user._id
        // console.log(isShared22)

        // includes(req.user._id)
        // console.log(publication.usersShared.find(element => element == req.user._id))

        // console.log(req.user._id)

        res.render('publication/details', { ...publication, isAuthor, isShared})
    })




router.get(
    '/:publicationID/edit',
    isAuth,
    preloadPublication,
    isPublicationAuthor,
    (req, res) => {
        res.render('publication/edit', { ...req.publication })
    })


router.post(
    '/:publicationID/edit',
    isAuth,
    preloadPublication,
    isPublicationAuthor,
    async (req, res) => {
        try {
            await publicationServices.update(req.params.publicationID, req.body)
            res.redirect(`/publication/${req.params.publicationID}/details`)
        } catch (error) {
            res.render('publication/edit', { ...req.body, error: getErrorMessage(error) })
        }
    })

router.get(
    '/:publicationID/delete',
    isAuth,
    preloadPublication,
    isPublicationAuthor,
    async(req, res) => {
        await publicationServices.delete(req.params.publicationID)
        res.redirect('/publication')
    })


router.get('/create', isAuth, (req, res) => {
    res.render('publication/create')
})


router.post('/create', isAuth, async (req, res) => {
    
    try {
        const publication = await publicationServices.create({ ...req.body, author: req.user._id })
        await userService.addPublication(req.user._id, publication._id)
        res.redirect('/publication')

    } catch (error) {
        res.render('publication/create', { error: getErrorMessage(error) })
    }

})

router.get(
    '/:publicationID/share',
    isAuth,
    async (req, res) => {
       const publication =  await publicationServices.getOne(req.params.publicationID)
       const user = await userService.getOne(req.user._id)
       publication.usersShared.push(req.user._id)
       user.shares.push(publication)
       await publication.save()
       await user.save()
        res.redirect('/')
    })


module.exports = router