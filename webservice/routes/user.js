const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const { authUser } = require('../middlewares/auth')
const { singleImageFileUpload } = require('../middlewares/fileParser')

router.get('/user', authUser, userController.getAllUsers)
router.get('/user/:id', authUser, userController.getUserById)
router.post('/user', userController.createUser)
router.put('/user/:id', authUser, userController.updateUserById)
router.delete('/user/:id', authUser, userController.deleteUserById)

router.post('/user/uploadProfilePic/:id', authUser, singleImageFileUpload, userController.uploadUserProfilePic)

module.exports = router