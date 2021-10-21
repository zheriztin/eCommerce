const { register, postRegister, login, postLogin, getUserProfile, logout } = require('../controllers/user')

const router = require('express').Router()
const productRouter = require('./product')
const cartRouter = require('./cart')
const transactionRouter = require('./transaction')

const isLoginMiddleware = function (req, res, next)  {
  if (req.session.isLogin) {
    console.log("ini");
    next()
  } else {
    console.log("masiukkkk ke else ?????");
    // redirect ke Landing Page
    // send alert please login first
    res.redirect('/products')
  }

}

//USER
router.get('/home', (req, res) => res.render('landing-page'))
router.get('/register', register)
router.post('/register', postRegister)
router.get('/login', login)
router.post('/login', postLogin)
router.post('/logout', logout)

// router.get('/users/profile', isLoginMiddleware, getUserProfile)
router.get('/users/profile', getUserProfile)

//products
router.use('/products', productRouter)

//cart

router.use('/carts', isLoginMiddleware, cartRouter)
router.use('/transactions', isLoginMiddleware, transactionRouter)




module.exports = router