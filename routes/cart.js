const { addToCart, getCart, checkout } = require('../controllers/cart')

const router = require('express').Router()

router.get('/', getCart )
router.post('/add', addToCart)
router.get('/checkout', checkout)

module.exports = router
