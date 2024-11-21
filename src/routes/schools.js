const express = require('express');
const router =  express.Router();

const schoolController = require("../controller/schools")

router.post('/create-schools',schoolController.createNewSchool)
router.post('/get-schools-by-id', schoolController.getSchoolsById)
router.post('/set-schools-contact', schoolController.setSchoolContact)
router.get('/get-schools', schoolController.getSchools)
router.post('/find-schools', schoolController.findSchool)

//Elective
router.get('/get-elective-list', schoolController.getElectiveList)
router.post('/save-school-elective', schoolController.saveSchoolElective);
router.post('/get-elective-school', schoolController.getElectiveSchool);

//psle
router.post('/save-psle-score', schoolController.savePSLEScore);
router.post('/get-psle-score', schoolController.getPSLE);

//ccas
router.get('/get-ccas-list', schoolController.getCCAsList)
router.post('/save-school-ccas', schoolController.saveSchoolCCAs)
router.post('/get-school-ccas', schoolController.getSchoolCCAs);

//DSA

router.get('/get-dsa-talent', schoolController.getDSATalentList);
router.post('/save-school-dsa', schoolController.saveSchoolDSAs)
router.post('/get-school-dsa', schoolController.getSchoolDSAs);

//Curriculum Inter
router.get('/get-curriculum-inter', schoolController.getCurriculumInter)
router.post('/save-school-curriculum-inter', schoolController.saveSchoolCurriculumInter)
router.post('/get-school-curriculum-inter', schoolController.getSchoolCurriculumInter)

//LanguageInstruction
router.get('/get-language-inter', schoolController.getLanguageInter)
router.post('/save-school-language-inter', schoolController.saveSchoolLanguageInter)
router.post('/get-school-language-inter', schoolController.getSchoolLanguageInter)

//SchoolInterClasses
router.post('/get-school-inter-classes', schoolController.getSchoolInterClasses);
router.post('/save-school-inter-classes', schoolController.saveSchoolInterClasses);

//SchoolInterExtracurricular
router.post('/get-school-inter-extracurricular', schoolController.getSchoolInterExtracurricular)
router.post('/save-school-inter-extracurricular', schoolController.saveSchoolInterExtracurricular)

//SchoolFees
router.post('/get-school-goverment-fees', schoolController.getSchoolGovermentFees)
router.post('/save-school-goverment-fees', schoolController.saveSchoolGovermentFees)

//Inter School Fees
router.post('/get-school-inter-fees',schoolController.getSchoolInterFees );
router.post('/delete-school-inter-fees', schoolController.deleteSchoolInterFees);
router.post('/create-school-inter-fees', schoolController.createSchoolInterFees);

module.exports = router