const express = require("express");
const tuitionModel =  require('../models/tuition');

const createTuition = async(req, res) => {
    const data = req.body.data;
    try{
        const [tuition] = await tuitionModel.createTuition({data});
        res.status(201).json({
            status: "success",
            data: tuition,
          });
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Unable to retrieve users.",
            error: error.message,
          });
    }
}

const getTuitioByUserId = async(req, res) => {
    const data = req.body.data;
    try{
        const [tuition] = await tuitionModel.getTuitioByUserId({data});
        res.status(200).json({
            status: "success",
            data: tuition,
          });
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Unable to retrieve users.",
            error: error.message,
          });
    }
}

const getAllTuition = async(req, res) => {
    try{
        const [tuition] = await tuitionModel.getTuition();
        res.status(200).json({
            status: "success",
            data: tuition,
          });
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Unable to retrieve users.",
            error: error.message,
          });
    }
}

module.exports = {
    createTuition,
    getTuitioByUserId,
    getAllTuition
}