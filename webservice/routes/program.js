const express = require('express')
const router = express.Router()
const programController = require('../controllers/ProgramController')
// const { authGuide } = require('../middlewares/auth')

router.get('/program', programController.getAllPrograms)
router.get('/program/:id', programController.getProgramById)
router.post('/program',  programController.createProgram)
router.put('/program/:id',  programController.updateProgramById)
router.delete('/program/:id',  programController.deleteProgramById)

module.exports = router