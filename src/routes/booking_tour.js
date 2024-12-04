const express = require('express');
const router =  express.Router();
const bookingTourController = require('../controller/booking_tour')

router.post('/create', bookingTourController.createBookingTour);
router.post('/get-by-id', bookingTourController.getBookingTourByUserId);
router.get('/get', bookingTourController.getAllBookingTour)

module.exports = router