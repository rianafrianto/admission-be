const express = require('express');
const router =  express.Router();
const bookingController = require('../controller/booking_consultation');

router.post('/create', bookingController.createBookingConsultation);
router.post('/get-my-consultation', bookingController.getMyConsultation);
router.post('/get-all', bookingController.getAllConsultation)

module.exports = router;