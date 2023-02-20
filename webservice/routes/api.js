const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const programRouter = require('./program')
const bookingRouter = require('./booking')

router.use(userRouter)
router.use(programRouter)
router.use(bookingRouter)

module.exports =  router