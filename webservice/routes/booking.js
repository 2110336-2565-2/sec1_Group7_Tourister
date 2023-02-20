const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/BookingController')

router.get('/booking', bookingController.getAllBookings)
router.get('/booking/:id', bookingController.getBookingById)
router.post('/booking', bookingController.createBooking)
router.put('/booking/:id', bookingController.updateBookingById)
router.delete('/booking/:id', bookingController.deleteBookingById)

module.exports = router