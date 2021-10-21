const { listTransactions } = require('../controllers/transaction')

const router = require('express').Router()

router.get('/', listTransactions)

module.exports = router