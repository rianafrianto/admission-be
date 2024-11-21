const express = require('express');
const router =  express.Router();

const subjectController = require('../controller/subject')

router.get('/get-all-subject', subjectController.getAllSubject);
router.post('/save-school-subject', subjectController.saveSchoolSubject)
router.post('/get-school-subject', subjectController.getSchoolSubject)


module.exports =  router;