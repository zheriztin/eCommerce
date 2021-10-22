const { addToCart, getCart, checkout, deleteItem, decreaseQuantity, increaseQuantity } = require('../controllers/cart')

const router = require('express').Router()

router.get('/', getCart )
router.post('/add', addToCart)
router.get('/checkout', checkout)
router.get('/item/:itemId/delete',deleteItem)
router.get('/item/:itemId/decrement',decreaseQuantity)
router.get('/item/:itemId/increment',increaseQuantity)

module.exports = router
