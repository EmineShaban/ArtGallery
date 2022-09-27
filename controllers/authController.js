const router = require('express').Router()

const authServices = require('../services/authServices')

router.get('/login', (req, res) =>{
    res.render('auth/login');
})
router.post('/login', async (req, res) =>{
    const {username, password} = req.body
   const user = await authServices.login(username, password)
    // res.render('auth/login')
});


router.get('/register', (req, res) =>{
    res.render('auth/register')
})

router.post('/register', async (req, res) =>{
    const { password, repeatPassword, ...userData} = req.body

    if (password !== repeatPassword) {
        return res.render('auth/register', {error: "Password missmatch!"})
    }


    try{
        await authServices.create({password, ...userData})
        res.redirect('/login')
    } catch (error){
        return res.render('auth/register', {error: "db error"})

    }

    
})

module.exports = router