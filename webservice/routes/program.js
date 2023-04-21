const express = require('express')
const router = express.Router()
const programController = require('../controllers/ProgramController')
const { authGuide } = require('../middlewares/auth')
const { multipleImageFileUpload } = require('../middlewares/fileParser')

router.get('/program', programController.getAllPrograms)
router.get('/program/published', programController.getAllPublishedPrograms)
router.get('/program/byGuide/:userId', programController.getAllPublishedProgramsByUserId)
router.get('/program/draftByGuide/:userId', programController.getAllDraftProgramsByUserId)
router.get('/program/:id', programController.getProgramById)
router.post('/program', authGuide, programController.createProgram)
router.put('/program/:id', authGuide, programController.updateProgramById)
router.delete('/program/:id', authGuide, programController.deleteProgramById)

router.post('/program/upload/photos', multipleImageFileUpload,  programController.uploadProgramPhotos)

module.exports = router