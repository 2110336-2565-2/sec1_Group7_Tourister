const express = require('express')
const router = express.Router()

router.get('/hello', async (req, res) => {
    return res.json({
        message: "helooooooo"
    })
})

module.exports =  router