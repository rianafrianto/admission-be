const express = require('express');
const router =  express.Router();

const UserController = require('../controller/users')

router.get('/', UserController.getAllUsers);
router.post('/', UserController.createNewUser);
router.post('/login', UserController.loginUsers);
router.post('/get-by-id', UserController.getUserWithID)
router.post('/auth-provider', UserController.authProvider)

module.exports = router