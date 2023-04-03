const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const programRouter = require('./program')
const bookingRouter = require('./booking')
const notificationRouter = require('./notification')
const topupRouter = require('./topup')
const withdrawRouter = require('./withdraw')

router.use(userRouter)
router.use(programRouter)
router.use(bookingRouter)
router.use(notificationRouter)
router.use(topupRouter)
router.use(withdrawRouter)

module.exports =  router