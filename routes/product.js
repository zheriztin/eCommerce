const { getProducts, createProduct, postCreateProduct, postEditProduct, editProduct, deleteProduct } = require('../controllers/product')

const router = require('express').Router()

router.get('/',getProducts)
router.get('/add', createProduct)
router.post('/add', postCreateProduct)
router.get('/:productId/edit', editProduct)
router.post('/:productId/edit', postEditProduct)
router.post('/:productId/delete', deleteProduct)

module.exports = router
