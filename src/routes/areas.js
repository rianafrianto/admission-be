const express = require('express');
const router =  express.Router();

const areasController = require('../controller/areas');

router.get('/', areasController.getAllAreas);

module.exports = router;