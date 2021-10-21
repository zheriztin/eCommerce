const { getProducts, createProduct, postCreateProduct, postEditProduct, editProduct, deleteProduct } = require('../controllers/product')

const router = require('express').Router()
//Selesai
router.get('/',getProducts)

//Belum selesai masih error di post create
router.get('/add', createProduct)
router.post('/add', postCreateProduct)

router.get('/:productId/edit', editProduct)
router.post('/:productId/edit', postEditProduct)
router.get('/:productId/delete', deleteProduct)

module.exports = router
