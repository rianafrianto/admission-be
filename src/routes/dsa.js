const express = require('express');
const router =  express.Router();

const dsaController = require('../controller/dsa');

router.get('/', dsaController.getAllDsa);

module.exports = router;