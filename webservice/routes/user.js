const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const { authUser } = require('../middlewares/auth')

router.get('/user', authUser, userController.getAllUsers)
router.get('/user/:id', authUser, userController.getUserById)
router.post('/user', userController.createUser)
router.put('/user/:id', authUser, userController.updateUserById)
router.delete('/user/:id', authUser, userController.deleteUserById)

module.exports = router