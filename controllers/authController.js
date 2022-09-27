const router = require('express').Router()

const authServices = require('../services/authServices')

const { COOKIE_SESSION_NAME } = require('../constants')


router.get('/login', (req, res) =>{
    res.render('auth/login');
})
router.post('/login', async (req, res) =>{
    const {username, password} = req.body
   const user = await authServices.login(username, password)
   const token = await authServices.createToken(user)

   res.cookie(COOKIE_SESSION_NAME, token, {httpOnly: true})
    res.redirect('/')
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
       const createdUser =  await authServices.create({password, ...userData})
       const token = await authServices.createToken(createdUser)

       res.cookie(COOKIE_SESSION_NAME, token, {httpOnly: true})
        res.redirect('/')
    } catch (error){
        return res.render('auth/register', {error: "db error"})

    }

    
})
router.get('/logout', (req, res) =>{
    res.clearCookie(COOKIE_SESSION_NAME)
    res.redirect('/')
})




module.exports = router