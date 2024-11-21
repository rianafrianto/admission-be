const express = require('express');
const router =  express.Router();

const paymentController = require('../../src/controller/payment')

router.post('/create-payment-intent', paymentController.createPaymentIntent)
module.exports = router