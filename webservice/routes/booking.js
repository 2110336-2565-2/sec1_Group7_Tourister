const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/BookingController')
const { authTourist, authUser, authGuide } = require('../middlewares/auth')

router.get('/booking', authUser, bookingController.getAllBookings)
router.get('/booking/byTourist/:userId', authUser, bookingController.getAllBookingsByUserId)
router.get('/booking/:id', authUser, bookingController.getBookingById)
router.post('/booking', authTourist, bookingController.createBooking)
router.delete('/booking/:id', authUser, bookingController.deleteBookingById)


router.post('/booking/accept/:id', authGuide, bookingController.acceptBookingById)
router.post('/booking/decline/:id', authGuide, bookingController.declineBookingById)

module.exports = router