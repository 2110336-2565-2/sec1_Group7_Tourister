const express = require('express')
const router = express.Router()
const WithdrawController = require('../controllers/WithdrawController')
const { authUser, authGuide } = require('../middlewares/auth')

router.post('/withdraw/coins', authUser, WithdrawController.userWithdrawCash)

module.exports = router