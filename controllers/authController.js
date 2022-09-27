const router = require('express').Router()

const authServices = require('../services/authServices')

router.get('/login', (req, res) =>{
    res.render('auth/login')
})
router.get('/register', (req, res) =>{
    res.render('auth/register')
})

router.post('/register', async (req, res) =>{
    const { username, password, repeatPassword } = req.body

    if (password !== repeatPassword) {
        return res.render('auth/register', {error: "Password missmatch!"})
    }


    try{
        await authServices.create({username, password})
        res.redirect('/login')
    } catch (error){
        return res.render('auth/register', {error: "db error"})

    }

    
})

module.exports = router