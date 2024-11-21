const express = require('express');
const router =  express.Router();

const meetingController = require('../controller/meeting');

router.get('/get-token', meetingController.getZoomToken);
router.post('/create-meetings', meetingController.createZoomMeeting)

module.exports = router;