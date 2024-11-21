const express = require('express');
const router =  express.Router();
const mailController  = require('../controller/mail');

router.post('/send-consultation-mail', mailController.sendBookingMail);

module.exports = router;