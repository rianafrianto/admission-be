const express = require('express');
const router =  express.Router();

const settingsController = require('../controller/settings')

router.get('/get', settingsController.getSettings);
router.post('/save', settingsController.saveSettings)

module.exports = router