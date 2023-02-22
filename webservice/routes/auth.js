const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

router.post('/login', AuthController.userLogin)
router.get('/verifyToken', AuthController.userVerifyToken)
router.get('/verifyToken/:role', AuthController.userVerifyToken)

module.exports = router