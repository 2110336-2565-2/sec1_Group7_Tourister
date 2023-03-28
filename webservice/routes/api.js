const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const programRouter = require('./program')
const bookingRouter = require('./booking')
const notificationRouter = require('./notification')

router.use(userRouter)
router.use(programRouter)
router.use(bookingRouter)
router.use(notificationRouter)

module.exports =  router