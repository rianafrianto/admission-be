const express = require("express");
const subjectModel =  require('../models/subject');

const getAllSubject= async(req, res) => {
    try{
        const [subject] = await subjectModel.getAllSubject();
        res.status(200).json({
          status: "success",
          data: subject,
        });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Unable to retrieve users.",
            error: error.message,
          });
    }
}


//school_subjuec

const saveSchoolSubject = async(req, res) => {
    const school_id = req.body.data.school_id;
    const subjects = req.body.data.subjects;
    try{
        const [check] = await subjectModel.getFirstSchoolSubject({school_id});
    if(check.length > 0){
        await subjectModel.deleteSchoolSubject({school_id});
    }
    for (let i=0;i<subjects.length;i++){
        await subjectModel.createSchoolSubject({school_id, subject_id:subjects[i].value})
    }
    res.status(200).json({
        status: "success",
        data: subjects,
      });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Unable to save school subject.",
            error: error.message,
          });
    }
    
}

const getSchoolSubject = async(req, res) => {
    const school_id = req.body.data.school_id;
    try{
        const [subjects] = await subjectModel.getSchoolSubject({school_id});
        res.status(200).json({
            status: "success",
            data: subjects,
          });
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Unable to get school subject.",
            error: error.message,
          });
    }
}

module.exports = {
    getAllSubject,
    saveSchoolSubject,
    getSchoolSubject
}