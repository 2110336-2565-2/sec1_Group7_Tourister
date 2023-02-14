const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const programRouter = require('./program')

router.use(userRouter)
router.use(programRouter)

module.exports =  router