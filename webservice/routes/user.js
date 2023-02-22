const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
// const { authUser } = require('../middlewares/auth')

router.get('/user',  userController.getAllUsers)
router.get('/user/:id',  userController.getUserById)
router.post('/user', userController.createUser)
router.put('/user/:id',  userController.updateUserById)
router.delete('/user/:id',  userController.deleteUserById)

module.exports = router