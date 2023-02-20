const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

router.post('/login', AuthController.userLogin)

module.exports = router