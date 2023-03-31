const express = require('express')
const router = express.Router()
const TopUpController = require('../controllers/TopUpController') 
const { authUser } = require('../middlewares/auth')

router.post('/coins', authUser, TopUpController.topUpCoins)

module.exports = router