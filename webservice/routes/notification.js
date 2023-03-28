const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/NotificationController')
const { authGuide } = require('../middlewares/auth')

router.get('/notification', notificationController.getAllNotifications)
router.get('/notification/notify/:userId', notificationController.getAllPublishedNotificationsByUserId)
router.get('/notification/:id', notificationController.getNotificationById)
router.post('/notification', notificationController.createNotification)
router.put('/notification/:id', notificationController.updateNotificationById)
router.delete('/notification/:id', notificationController.deleteNotificationById)

module.exports = router