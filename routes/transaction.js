const { listTransactions,  getTransactionDetail } = require('../controllers/transaction')

const router = require('express').Router()

router.get('/', listTransactions)
router.get('/:id', getTransactionDetail)
// router.get('/send/invoice', sendInvoice)

module.exports = router