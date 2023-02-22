const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/BookingController')
// const { authTourist, authUser, authGuide } = require('../middlewares/auth')

<<<<<<< Updated upstream
router.get('/booking', bookingController.getAllBookings)
router.get('/booking/:id', authUser, bookingController.getBookingById)
router.post('/booking', authTourist, bookingController.createBooking)
router.delete('/booking/:id', authUser, bookingController.deleteBookingById)
=======
router.get('/booking',  bookingController.getAllBookings)
router.get('/booking/:id',  bookingController.getBookingById)
router.post('/booking',  bookingController.createBooking)
router.delete('/booking/:id',  bookingController.deleteBookingById)
>>>>>>> Stashed changes

router.post('/booking/accept/:id', bookingController.acceptBookingById)
router.post('/booking/decline/:id', bookingController.declineBookingById)

module.exports = router