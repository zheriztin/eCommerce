const { addToCart, getCart, checkout } = require('../controllers/cart')

const router = require('express').Router()

const isLoginMiddleware = function (req, res, next)  {
  if (req.session.isLogin) {
    console.log("ini");
    next()
  } else {
    console.log("masiukkkk ke else ?????");
    // redirect ke Landing Page
    res.json("nonoono")
    // res.redirect('/')
  }

}

router.get('/', getCart )
router.post('/add', addToCart)
router.get('/checkout', checkout)

module.exports = router
